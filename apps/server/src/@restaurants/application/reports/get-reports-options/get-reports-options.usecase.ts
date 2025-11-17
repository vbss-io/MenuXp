import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import type { GetReportsOptionsType } from '@restaurants/application/reports/get-reports-options/get-reports-options.schema'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'
import { ComboRepository } from '@restaurants/infra/repositories/combo.repository'
import { CouponRepository } from '@restaurants/infra/repositories/coupon.repository'
import { MenuItemRepository } from '@restaurants/infra/repositories/menu-item.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

const CACHE_TTL_MS = 5 * 60 * 1000

interface ReportsOptionsOutput {
  categories: Array<{ id: string; name: string }>
  menuItems: Array<{ id: string; name: string }>
  combos: Array<{ id: string; name: string }>
  coupons: Array<{ code: string; name: string }>
  operationTypes: Array<{ value: string; label: string }>
  segments: Array<{ value: string; label: string }>
}

type GetReportsOptionsUsecaseInput = GetReportsOptionsType & {
  userId: string
}

export class GetReportsOptionsUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  @inject('MenuItemRepository')
  private readonly MenuItemRepository!: MenuItemRepository

  @inject('ComboRepository')
  private readonly ComboRepository!: ComboRepository

  @inject('CouponRepository')
  private readonly CouponRepository!: CouponRepository

  @inject('Cache')
  private readonly Cache!: Cache

  @inject('Logger')
  private readonly Logger!: Logger

  async execute({ userId, restaurantId }: GetReportsOptionsUsecaseInput): Promise<ReportsOptionsOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId)) {
      throw new ForbiddenError('User does not have permission to view reports for this restaurant')
    }
    const cacheKey = `reports:options:${restaurantId}`
    const cached = this.Cache.get<ReportsOptionsOutput>(cacheKey)
    if (cached) {
      this.Logger.info('Returning cached reports options', { restaurantId, userId })
      return cached
    }
    this.Logger.info('Fetching reports options from database', { restaurantId, userId })
    const [categories, menuItems, combos, coupons] = await Promise.all([
      this.CategoryRepository.find({ restaurantId }),
      this.MenuItemRepository.find({ restaurantId }),
      this.ComboRepository.find({ restaurantId }),
      this.CouponRepository.find({ restaurantId })
    ])
    const result: ReportsOptionsOutput = {
      categories: categories.map((category) => ({
        id: category.id as string,
        name: category.name
      })),
      menuItems: menuItems.map((item) => ({
        id: item.id as string,
        name: item.name
      })),
      combos: combos.map((combo) => ({
        id: combo.id as string,
        name: combo.name
      })),
      coupons: coupons.map((coupon) => ({
        code: coupon.code,
        name: coupon.name
      })),
      operationTypes: [
        { value: 'delivery', label: 'Delivery' },
        { value: 'pickup', label: 'Pickup' },
        { value: 'dine-in', label: 'Dine In' }
      ],
      segments: [
        { value: 'new', label: 'New Customers' },
        { value: 'returning', label: 'Returning Customers' }
      ]
    }
    this.Cache.set(cacheKey, result, CACHE_TTL_MS)
    this.Logger.info('Reports options cached successfully', {
      restaurantId,
      userId,
      categoriesCount: result.categories.length,
      menuItemsCount: result.menuItems.length,
      combosCount: result.combos.length,
      couponsCount: result.coupons.length
    })
    return result
  }
}
