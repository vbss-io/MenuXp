import { type Model, type PipelineStage } from 'mongoose'

import type { MenuItemDocument } from '@restaurants/domain/menu-items/menu-item.schema'

export type MenuItemSortField = 'name' | 'price' | 'createdAt' | 'updatedAt'
export type SortOrder = 'asc' | 'desc'

export interface MenuItemDocumentWithCategoryName extends MenuItemDocument {
  categoryName: string
}

export interface GetMenuItemsQueryInput {
  restaurantId: string
  categoryId?: string
  searchMask?: string
  includeInactive?: boolean
  page?: number
  rowsPerPage?: number
  sortField?: MenuItemSortField
  sortOrder?: SortOrder
}

export interface MenuItemQueryResult {
  totalCount: number
  documents: Array<MenuItemDocumentWithCategoryName>
}

export class GetMenuItemsQueryBuilderMongoose {
  private basePipeline: PipelineStage[] = []
  private paginationStages: PipelineStage[] = []
  private readonly menuItemModel: Model<MenuItemDocument>

  private constructor(menuItemModel: Model<MenuItemDocument>) {
    this.menuItemModel = menuItemModel
  }

  static init(menuItemModel: Model<MenuItemDocument>): GetMenuItemsQueryBuilderMongoose {
    return new GetMenuItemsQueryBuilderMongoose(menuItemModel)
  }

  restaurantId(restaurantId: string): this {
    this.basePipeline.push({
      $match: { restaurantId }
    })
    return this
  }

  categoryId(categoryId?: string): this {
    if (!categoryId) return this
    this.basePipeline.push({
      $match: { categoryId }
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

  sort(sortField?: MenuItemSortField, sortOrder: SortOrder = 'asc'): this {
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

  private addCategoryLookup(): void {
    this.basePipeline.push(
      {
        $addFields: {
          categoryIdString: { $toString: '$categoryId' }
        }
      },
      {
        $lookup: {
          from: 'categories',
          let: { categoryId: '$categoryIdString' },
          pipeline: [
            {
              $addFields: {
                categoryIdString: { $toString: '$_id' }
              }
            },
            {
              $match: {
                $expr: { $eq: ['$categoryIdString', '$$categoryId'] }
              }
            }
          ],
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          categoryName: '$category.name'
        }
      }
    )
  }

  private async getTotalCount(): Promise<number> {
    const countPipeline = [...this.basePipeline, { $count: 'total' }]
    const [result] = (await this.menuItemModel.aggregate(countPipeline).exec()) as Array<{ total: number }>
    return result?.total || 0
  }

  async execute(): Promise<MenuItemQueryResult> {
    this.addCategoryLookup()
    const pipeline = [...this.basePipeline, ...this.paginationStages]
    const documents = (await this.menuItemModel.aggregate(pipeline).exec()) as MenuItemDocumentWithCategoryName[]
    const totalCount = await this.getTotalCount()
    return {
      documents,
      totalCount
    }
  }
}
