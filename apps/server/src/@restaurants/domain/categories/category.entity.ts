export interface CategoryOptional {
  name: string
  maxQuantity?: number
  price: number
}

export class Category {
  name: string
  isActive: boolean
  description?: string
  restaurantId?: string
  mainCategoryId?: string
  icon?: string
  optionals: CategoryOptional[]

  private constructor(
    readonly id: string | undefined,
    name: string,
    isActive: boolean,
    optionals: CategoryOptional[],
    description?: string,
    restaurantId?: string,
    mainCategoryId?: string,
    icon?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.name = name
    this.isActive = isActive
    this.description = description
    this.restaurantId = restaurantId
    this.mainCategoryId = mainCategoryId
    this.icon = icon
    this.optionals = optionals
  }

  static create(input: CreateCategory): Category {
    return new Category(
      undefined,
      input.name,
      true,
      input.optionals ?? [],
      input.description,
      input.restaurantId,
      input.mainCategoryId,
      input.icon
    )
  }

  static restore(input: RestoreCategory): Category {
    return new Category(
      input.id,
      input.name,
      input.isActive,
      input.optionals,
      input.description,
      input.restaurantId,
      input.mainCategoryId,
      input.icon,
      input.createdAt,
      input.updatedAt
    )
  }

  update(input: Partial<Category>): void {
    this.name = input.name ?? this.name
    this.isActive = input.isActive ?? this.isActive
    this.description = input.description ?? this.description
    this.restaurantId = input.restaurantId ?? this.restaurantId
    this.mainCategoryId = input.mainCategoryId ?? this.mainCategoryId
    this.icon = input.icon ?? this.icon
    this.optionals = input.optionals ?? this.optionals
  }

  activate(): void {
    this.isActive = true
  }

  deactivate(): void {
    this.isActive = false
  }

  isMainCategory(): boolean {
    return !this.mainCategoryId
  }

  isSubCategory(): boolean {
    return !!this.mainCategoryId
  }

  getMainCategoryId(): string | undefined {
    return this.mainCategoryId
  }

  addOptional(optional: CategoryOptional): void {
    this.optionals.push(optional)
  }

  removeOptional(optionalName: string): void {
    this.optionals = this.optionals.filter((o) => o.name !== optionalName)
  }

  updateOptional(optionalName: string, updates: Partial<CategoryOptional>): void {
    const optional = this.optionals.find((o) => o.name === optionalName)
    if (optional) {
      Object.assign(optional, updates)
    }
  }
}

export interface CreateCategory {
  name: string
  description?: string
  restaurantId?: string
  mainCategoryId?: string
  icon?: string
  optionals?: CategoryOptional[]
}

type RestoreCategory = CreateCategory & {
  id: string
  isActive: boolean
  optionals: CategoryOptional[]
  createdAt: Date
  updatedAt: Date
}
