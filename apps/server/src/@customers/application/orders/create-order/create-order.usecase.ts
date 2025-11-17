import { NotFoundError, UnauthorizedError } from '@api/domain/errors'
import { Address } from '@api/domain/types/address.type'
import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { Queue } from '@api/infra/adapters/queue/queue.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { CreateOrderType } from '@customers/application/orders/create-order/create-order.schema'
import { VerificationCodeService } from '@customers/application/whatsapp-verification/verification-code.service'
import { CartRepository } from '@customers/infra/repositories/cart.repository'
import { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

import { OperationStatus } from '@restaurants/domain/operations/enums/operation-status.enum'
import { ORDER_CREATED } from '@restaurants/domain/orders/consts/order-events.const'
import { OrderCreated } from '@restaurants/domain/orders/events/order-created.event'
import { Order } from '@restaurants/domain/orders/orders.entity'
import { BusinessWeekDay } from '@restaurants/domain/restaurants/enums/business-week-day.enum'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { OperationRepository } from '@restaurants/infra/repositories/operation.repository'
import { OrderRepository } from '@restaurants/infra/repositories/orders.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

type CreateOrderUsecaseInput = CreateOrderType

export class CreateOrderUsecase {
  @inject('Queue')
  private readonly queue!: Queue

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('OperationRepository')
  private readonly OperationRepository!: OperationRepository

  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository

  @inject('CartRepository')
  private readonly CartRepository!: CartRepository

  @inject('OrderRepository')
  private readonly OrderRepository!: OrderRepository

  @inject('VerificationCodeService')
  private readonly verificationCodeService!: VerificationCodeService

  @inject('Cache')
  private readonly cache!: Cache

  async execute(input: CreateOrderUsecaseInput): Promise<Order> {
    const client = await this.CustomerUserRepository.findById(input.clientId)
    if (!client) throw new NotFoundError('Client', input.clientId)
    const tokenData = this.verificationCodeService.validateToken(input.verificationToken)
    if (!tokenData) {
      throw new UnauthorizedError('Invalid or expired verification token')
    }
    if (tokenData.restaurantId !== client.restaurantId) {
      throw new UnauthorizedError('Verification token does not match restaurant')
    }
    if (tokenData.phone !== client.phone) {
      throw new UnauthorizedError('Verification token does not match client phone')
    }
    const cart = await this.CartRepository.findOne({
      clientId: input.clientId,
      restaurantId: client.restaurantId
    })
    if (!cart || !cart.items || cart.items.length === 0) throw new Error('Cart is empty')
    const restaurant = await this.RestaurantRepository.findById(client.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', client.restaurantId)
    const isScheduled = !!input.scheduledFor
    if (isScheduled) {
      if (!restaurant.settings?.acceptsScheduling) {
        throw new Error('Restaurant does not accept scheduling')
      }
      if (input.scheduledFor && restaurant.settings?.businessHours) {
        const isWithinBusinessHours = this.isScheduledTimeValid(input.scheduledFor, restaurant.settings.businessHours)
        if (!isWithinBusinessHours) {
          throw new Error('Restaurant is closed at scheduled time')
        }
      }
    }
    if (!isScheduled) {
      if (!input.operationId) {
        throw new Error('Operation is not active')
      }
      const operation = await this.OperationRepository.findById(input.operationId)
      if (!operation) throw new NotFoundError('Operation', input.operationId)
      if (operation.status === OperationStatus.PAUSED) {
        throw new Error('Operation is paused')
      }
      if (operation.status !== OperationStatus.RUNNING) {
        throw new Error('Operation is not active')
      }
    }
    const orderItems = []
    for (const cartItem of cart.items) {
      if (cartItem.itemType === 'menu-item') {
        const menuItem = await this.MenuItemRepository.findById(cartItem.itemId)
        if (!menuItem) throw new Error(`Menu item ${cartItem.itemId} not found`)
        if (menuItem.restaurantId !== client.restaurantId) throw new Error('Unauthorized order operation')
        if (!menuItem.isActive) throw new Error(`Menu item ${menuItem.name} is not available`)
        orderItems.push({
          itemId: menuItem.id as string,
          name: menuItem.name,
          price: menuItem.price,
          quantity: cartItem.quantity,
          itemType: 'menu-item' as const,
          categoryId: menuItem.categoryId,
          optionals: cartItem.optionals ?? [],
          note: cartItem.note ?? ''
        })
      }
      if (cartItem.itemType === 'combo') {
        const combo = await this.ComboRepository.findById(cartItem.itemId)
        if (!combo) throw new Error(`Combo ${cartItem.itemId} not found`)
        if (combo.restaurantId !== client.restaurantId) throw new Error('Unauthorized order operation')
        if (!combo.isActive) throw new Error(`Combo ${combo.name} is not available`)
        orderItems.push({
          itemId: combo.id as string,
          name: combo.name,
          price: combo.price,
          quantity: cartItem.quantity,
          itemType: 'combo' as const,
          categoryId: combo.categoryId,
          optionals: cartItem.optionals ?? [],
          note: cartItem.note ?? ''
        })
      }
    }
    const customerAddress = client.address as Address
    const orderData = {
      restaurantId: client.restaurantId,
      operationId: input.operationId,
      clientId: input.clientId,
      customer: {
        name: client.name ?? '',
        phone: client.phone,
        address: {
          street: customerAddress.street ?? '',
          number: customerAddress.number ?? '',
          complement: customerAddress.complement ?? '',
          neighborhood: customerAddress.neighborhood ?? '',
          city: customerAddress.city ?? '',
          state: customerAddress.state ?? ''
        }
      },
      orderType: input.orderType,
      paymentMethod: input.paymentMethod,
      deliveryFee: input.deliveryFee,
      items: orderItems,
      scheduledFor: input.scheduledFor
    }
    const order = Order.create(orderData)
    const createdOrder = await this.OrderRepository.create(order)
    await this.CartRepository.delete({ id: cart.id })
    this.cache.delete(`checkout-verification:${input.verificationToken}`)
    const orderCreatedEvent = new OrderCreated({
      orderId: createdOrder.id as string,
      orderCode: createdOrder.code,
      restaurantId: createdOrder.restaurantId,
      customerId: createdOrder.clientId,
      customerName: createdOrder.customer.name,
      total: createdOrder.total,
      isScheduled: createdOrder.isScheduled,
      scheduledFor: createdOrder.scheduledFor,
      status: createdOrder.status
    })
    await this.queue.publish(ORDER_CREATED.eventName, orderCreatedEvent.data)
    return createdOrder
  }

  private isScheduledTimeValid(scheduledFor: Date, businessHours: Record<string, string>): boolean {
    const scheduledDate = new Date(scheduledFor)
    const dayOfWeek = scheduledDate.getDay()
    const dayMap: Record<number, BusinessWeekDay> = {
      0: BusinessWeekDay.SUNDAY,
      1: BusinessWeekDay.MONDAY,
      2: BusinessWeekDay.TUESDAY,
      3: BusinessWeekDay.WEDNESDAY,
      4: BusinessWeekDay.THURSDAY,
      5: BusinessWeekDay.FRIDAY,
      6: BusinessWeekDay.SATURDAY
    }
    const dayKey = dayMap[dayOfWeek]
    const hoursRange = businessHours[dayKey]
    if (!hoursRange) {
      return false
    }
    const [openTime, closeTime] = hoursRange.split('-')
    if (!openTime || !closeTime) {
      return false
    }
    const [openHour, openMinute] = openTime.split(':').map(Number)
    const [closeHour, closeMinute] = closeTime.split(':').map(Number)
    const scheduledHour = scheduledDate.getHours()
    const scheduledMinute = scheduledDate.getMinutes()
    const scheduledMinutes = scheduledHour * 60 + scheduledMinute
    const openMinutes = openHour * 60 + openMinute
    const closeMinutes = closeHour * 60 + closeMinute
    return scheduledMinutes >= openMinutes && scheduledMinutes <= closeMinutes
  }
}
