import { CategoryModel } from '@restaurants/domain/categories/category.schema'

export interface CategoryName {
  id: string
  name: string
  mainCategoryName?: string
  icon?: string
}

export interface GetCategoriesNamesQueryInput {
  restaurantId: string
  searchMask?: string
}

export interface GetCategoriesNamesQuery {
  execute: (input: GetCategoriesNamesQueryInput) => Promise<CategoryName[]>
}

interface MatchStage {
  restaurantId: string
  isActive: boolean
  name?: { $regex: string; $options: string }
}

export class GetCategoriesNamesQueryMongoose implements GetCategoriesNamesQuery {
  async execute(input: GetCategoriesNamesQueryInput): Promise<CategoryName[]> {
    const matchStage: MatchStage = {
      restaurantId: input.restaurantId,
      isActive: true
    }
    if (input.searchMask) {
      matchStage.name = { $regex: input.searchMask, $options: 'i' }
    }
    const categories = await CategoryModel.aggregate([
      {
        $match: matchStage
      },
      {
        $lookup: {
          from: 'categories',
          let: { mainCategoryId: '$mainCategoryId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', { $toObjectId: '$$mainCategoryId' }] }
              }
            },
            {
              $project: {
                name: 1
              }
            }
          ],
          as: 'mainCategory'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          icon: 1,
          mainCategoryName: {
            $cond: {
              if: { $gt: [{ $size: '$mainCategory' }, 0] },
              then: { $arrayElemAt: ['$mainCategory.name', 0] },
              else: null
            }
          }
        }
      },
      {
        $limit: 20
      }
    ])
    const categoryNames: CategoryName[] = categories.map(
      (category: { _id: string; name: string; mainCategoryName?: string; icon?: string }) => ({
        id: category._id.toString(),
        name: category.name,
        mainCategoryName: category.mainCategoryName || undefined,
        icon: category.icon || undefined
      })
    )
    return categoryNames
  }
}
