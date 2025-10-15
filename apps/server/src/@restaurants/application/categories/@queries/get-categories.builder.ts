import { type Model, type PipelineStage } from 'mongoose'

import type { CategoryDocument } from '@restaurants/domain/categories/category.schema'

export type CategorySortField = 'name' | 'createdAt' | 'updatedAt'
export type SortOrder = 'asc' | 'desc'

export interface GetCategoriesQueryInput {
  restaurantId: string
  mainCategoryId?: string
  searchMask?: string
  includeInactive?: boolean
  page?: number
  rowsPerPage?: number
  sortField?: CategorySortField
  sortOrder?: SortOrder
}

export interface CategoryQueryOutput {
  totalCount: number
  documents: CategoryDocument[]
}

export class GetCategoriesQueryBuilderMongoose {
  private basePipeline: PipelineStage[] = []
  private paginationStages: PipelineStage[] = []
  private readonly categoryModel: Model<CategoryDocument>

  private constructor(categoryModel: Model<CategoryDocument>) {
    this.categoryModel = categoryModel
  }

  static init(categoryModel: Model<CategoryDocument>): GetCategoriesQueryBuilderMongoose {
    return new GetCategoriesQueryBuilderMongoose(categoryModel)
  }

  restaurantId(restaurantId: string): this {
    this.basePipeline.push({
      $match: { restaurantId }
    })
    return this
  }

  mainCategoryId(mainCategoryId?: string): this {
    if (mainCategoryId === undefined || mainCategoryId === null) {
      this.basePipeline.push({
        $match: {
          $or: [{ mainCategoryId: null }, { mainCategoryId: { $exists: false } }]
        }
      })
      return this
    }
    this.basePipeline.push({
      $match: { mainCategoryId }
    })
    return this
  }

  search(searchMask?: string): this {
    if (!searchMask) return this
    const searchRegex = new RegExp(searchMask, 'i')
    this.basePipeline.push({
      $match: {
        $or: [{ name: searchRegex }, { description: searchRegex }]
      }
    })
    return this
  }

  includeInactive(includeInactive?: boolean): this {
    if (includeInactive !== false) return this
    this.basePipeline.push({
      $match: { isActive: true }
    })
    return this
  }

  sort(sortField?: CategorySortField, sortOrder: SortOrder = 'asc'): this {
    if (!sortField) return this
    this.basePipeline.push({
      $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 }
    })
    return this
  }

  paginate(page?: number, rowsPerPage?: number): this {
    if (!page || !rowsPerPage) return this
    const skip = (page - 1) * rowsPerPage
    this.paginationStages = [{ $skip: skip }, { $limit: rowsPerPage }]
    return this
  }

  withSubCategories(searchMask?: string, includeInactive?: boolean): this {
    const lookupPipeline: PipelineStage[] = []
    if (searchMask) {
      const searchRegex = new RegExp(searchMask, 'i')
      lookupPipeline.push({
        $match: {
          $or: [{ name: searchRegex }, { description: searchRegex }]
        }
      })
    }
    if (includeInactive === false) {
      lookupPipeline.push({ $match: { isActive: true } })
    }
    this.basePipeline.push({
      $lookup: {
        from: 'categories',
        let: { mainId: '$_id' },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        pipeline: [
          { $match: { $expr: { $eq: ['$mainCategoryId', { $toString: '$$mainId' }] } } },
          ...lookupPipeline
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ] as any,
        as: 'subCategories'
      }
    })
    return this
  }

  private async getTotalCount(): Promise<number> {
    const countPipeline = [...this.basePipeline, { $count: 'total' }]
    const [result] = (await this.categoryModel.aggregate(countPipeline).exec()) as Array<{ total: number }>
    return result?.total || 0
  }

  async execute(): Promise<CategoryQueryOutput> {
    const pipeline = [...this.basePipeline, ...this.paginationStages]
    const documents = (await this.categoryModel.aggregate(pipeline).exec()) as CategoryDocument[]
    const totalCount = await this.getTotalCount()
    return {
      documents,
      totalCount
    }
  }
}
