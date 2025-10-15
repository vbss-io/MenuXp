export interface MenuItemOptional {
  name: string
  maxQuantity?: number
  price: number
}

export class MenuItem {
  name: string
  isActive: boolean
  description?: string
  categoryId: string
  price: number
  stock: number
  discount: number
  medias: string[]
  optionals: MenuItemOptional[]
  useCategoryOptionals: boolean

  private constructor(
    readonly id: string | undefined,
    name: string,
    isActive: boolean,
    readonly restaurantId: string,
    categoryId: string,
    price: number,
    stock: number,
    discount: number,
    medias: string[],
    optionals: MenuItemOptional[],
    useCategoryOptionals: boolean,
    description?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.name = name
    this.isActive = isActive
    this.description = description
    this.categoryId = categoryId
    this.price = price
    this.stock = stock
    this.discount = discount
    this.medias = medias
    this.optionals = optionals
    this.useCategoryOptionals = useCategoryOptionals
  }

  static create(input: CreateMenuItem): MenuItem {
    return new MenuItem(
      undefined,
      input.name,
      true,
      input.restaurantId,
      input.categoryId,
      input.price,
      input?.stock ?? 0,
      input?.discount ?? 0,
      input?.medias ?? [],
      input?.optionals ?? [],
      input?.useCategoryOptionals ?? false,
      input.description
    )
  }

  static restore(input: RestoreMenuItem): MenuItem {
    return new MenuItem(
      input.id,
      input.name,
      input.isActive,
      input.restaurantId,
      input.categoryId,
      input.price,
      input.stock,
      input.discount,
      input.medias,
      input.optionals,
      input.useCategoryOptionals,
      input.description,
      input.createdAt,
      input.updatedAt
    )
  }

  update(input: Partial<MenuItem>): void {
    this.name = input.name ?? this.name
    this.isActive = input.isActive ?? this.isActive
    this.description = input.description ?? this.description
    this.categoryId = input.categoryId ?? this.categoryId
    this.price = input.price ?? this.price
    this.stock = input.stock ?? this.stock
    this.discount = input.discount ?? this.discount
    this.optionals = input.optionals ?? this.optionals
    this.useCategoryOptionals = input.useCategoryOptionals ?? this.useCategoryOptionals
  }

  addMedia(media: string): void {
    this.medias.push(media)
  }

  removeMedia(media: string): void {
    this.medias = this.medias.filter((m) => m !== media)
  }

  addOptional(optional: MenuItemOptional): void {
    this.optionals.push(optional)
  }

  removeOptional(optionalName: string): void {
    this.optionals = this.optionals.filter((o) => o.name !== optionalName)
  }

  updateOptional(optionalName: string, updates: Partial<MenuItemOptional>): void {
    const optional = this.optionals.find((o) => o.name === optionalName)
    if (optional) {
      Object.assign(optional, updates)
    }
  }

  activate(): void {
    this.isActive = true
  }

  deactivate(): void {
    this.isActive = false
  }

  isAvailable(): boolean {
    return this.isActive && (this.stock === 0 || this.stock > 0)
  }

  getFinalPrice(): number {
    return this.price - this.discount
  }
}

export interface CreateMenuItem {
  name: string
  restaurantId: string
  categoryId: string
  price: number
  stock?: number
  discount?: number
  medias?: string[]
  optionals?: MenuItemOptional[]
  useCategoryOptionals?: boolean
  description?: string
}

type RestoreMenuItem = CreateMenuItem & {
  id: string
  stock: number
  discount: number
  medias: string[]
  optionals: MenuItemOptional[]
  useCategoryOptionals: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
