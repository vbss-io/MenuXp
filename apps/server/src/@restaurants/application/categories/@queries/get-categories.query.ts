import { inject } from '@api/infra/dependency-injection/registry'

import {
  GetCategoriesQueryBuilderMongoose,
  type GetCategoriesQueryInput
} from '@restaurants/application/categories/@queries/get-categories.builder'
import { Category } from '@restaurants/domain/categories/category.entity'
import { CategoryModel } from '@restaurants/domain/categories/category.schema'
import { CategoryRepository } from '@restaurants/infra/repositories/category.repository'

export type CategoryWithSub = Category & { subCategories: Category[] }

export interface GetCategoriesQueryOutput {
  total: number
  categories: CategoryWithSub[]
}

export interface GetCategoriesQuery {
  execute: (input: GetCategoriesQueryInput) => Promise<GetCategoriesQueryOutput>
}

export class GetCategoriesQueryMongoose implements GetCategoriesQuery {
  @inject('CategoryRepository')
  private readonly CategoryRepository!: CategoryRepository

  async execute(input: GetCategoriesQueryInput): Promise<GetCategoriesQueryOutput> {
    const mainCategoriesQuery = GetCategoriesQueryBuilderMongoose.init(CategoryModel)
      .restaurantId(input.restaurantId)
      .mainCategoryId(input.mainCategoryId)
      .search(input.searchMask)
      .includeInactive(input.includeInactive)
      .sort(input.sortField, input.sortOrder)
      .paginate(input.page, input.rowsPerPage)
    const { documents: mainDocuments, totalCount } = await mainCategoriesQuery.execute()
    const categories = await Promise.all(
      mainDocuments.map(async (mainDoc) => {
        const subCategoriesQuery = GetCategoriesQueryBuilderMongoose.init(CategoryModel)
          .restaurantId(input.restaurantId)
          .mainCategoryId(mainDoc._id.toString())
          .search(input.searchMask)
          .includeInactive(input.includeInactive)
          .sort(input.sortField, input.sortOrder)
        const { documents: subDocuments } = await subCategoriesQuery.execute()
        const mainCategory = this.CategoryRepository.toDomain(mainDoc)
        const subCategories = subDocuments.map((subDoc) => this.CategoryRepository.toDomain(subDoc))
        return Object.assign(mainCategory, { subCategories }) as CategoryWithSub
      })
    )
    return { total: totalCount, categories }
  }
}
