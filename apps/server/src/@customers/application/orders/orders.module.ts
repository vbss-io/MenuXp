import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { CreateOrderController } from '@customers/application/orders/create-order/create-order.controller'
import { CreateOrderSchema } from '@customers/application/orders/create-order/create-order.schema'
import { CreateOrderUsecase } from '@customers/application/orders/create-order/create-order.usecase'
import { GetOrderBySlugAndCodeController } from '@customers/application/orders/get-order-by-slug-and-code/get-order-by-slug-and-code.controller'
import { GetOrderBySlugAndCodeSchema } from '@customers/application/orders/get-order-by-slug-and-code/get-order-by-slug-and-code.schema'
import { GetOrderBySlugAndCodeUsecase } from '@customers/application/orders/get-order-by-slug-and-code/get-order-by-slug-and-code.usecase'
import { GetOrdersByClientPhoneController } from '@customers/application/orders/get-orders-by-client-phone/get-orders-by-client-phone.controller'
import { GetOrdersByClientPhoneSchema } from '@customers/application/orders/get-orders-by-client-phone/get-orders-by-client-phone.schema'
import { GetOrdersByClientPhoneUsecase } from '@customers/application/orders/get-orders-by-client-phone/get-orders-by-client-phone.usecase'
import { GetOrdersByClientController } from '@customers/application/orders/get-orders-by-client/get-orders-by-client.controller'
import { GetOrdersByClientSchema } from '@customers/application/orders/get-orders-by-client/get-orders-by-client.schema'
import { GetOrdersByClientUsecase } from '@customers/application/orders/get-orders-by-client/get-orders-by-client.usecase'

export class OrdersModule {
  constructor() {
    const registry = Registry.getInstance()

    registry.provide('CreateOrderValidate', new ZodAdapter(CreateOrderSchema))
    registry.provide('CreateOrderUsecase', new CreateOrderUsecase())
    new CreateOrderController()

    registry.provide('GetOrderBySlugAndCodeValidate', new ZodAdapter(GetOrderBySlugAndCodeSchema))
    registry.provide('GetOrderBySlugAndCodeUsecase', new GetOrderBySlugAndCodeUsecase())
    new GetOrderBySlugAndCodeController()

    registry.provide('GetOrdersByClientValidate', new ZodAdapter(GetOrdersByClientSchema))
    registry.provide('GetOrdersByClientUsecase', new GetOrdersByClientUsecase())
    new GetOrdersByClientController()

    registry.provide('GetOrdersByClientPhoneValidate', new ZodAdapter(GetOrdersByClientPhoneSchema))
    registry.provide('GetOrdersByClientPhoneUsecase', new GetOrdersByClientPhoneUsecase())
    new GetOrdersByClientPhoneController()
  }
}
