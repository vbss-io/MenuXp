import { ForbiddenError } from '@api/domain/errors/forbidden.error'
import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'
import { CategoryWithSub, GetCategoriesQuery } from '@restaurants/application/categories/@queries/get-categories.query'
import { GetCategoriesType } from '@restaurants/application/categories/get-categories/get-categories.schema'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetCategoriesUsecaseInput = GetCategoriesType & {
  userId: string
}

export interface GetCategoriesUsecaseOutput {
  total: number
  categories: CategoryWithSub[]
}

export class GetCategoriesUsecase {
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('GetCategoriesQuery')
  private readonly GetCategoriesQuery!: GetCategoriesQuery

  async execute({ userId, restaurantId, ...input }: GetCategoriesUsecaseInput): Promise<GetCategoriesUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to get categories')
    const result = await this.GetCategoriesQuery.execute({
      restaurantId,
      ...input,
      includeInactive: input.includeInactive === 'true'
    })
    return result
  }
}
