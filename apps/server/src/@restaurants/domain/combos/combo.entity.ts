export interface ComboItem {
  menuItemId: string
  quantity: number
  name: string
  price: number
}

export interface ComboOptional {
  name: string
  maxQuantity?: number
  price: number
}

export class Combo {
  name: string
  isActive: boolean
  description?: string
  categoryId: string
  price: number
  stock: number
  discount: number
  medias: string[]
  items: ComboItem[]
  optionals: ComboOptional[]
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
    items: ComboItem[],
    optionals: ComboOptional[],
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
    this.items = items
    this.optionals = optionals
    this.useCategoryOptionals = useCategoryOptionals
  }

  static create(input: CreateCombo): Combo {
    return new Combo(
      undefined,
      input.name,
      true,
      input.restaurantId,
      input.categoryId,
      input.price,
      input?.stock ?? 0,
      input?.discount ?? 0,
      input?.medias ?? [],
      input.items,
      input?.optionals ?? [],
      input?.useCategoryOptionals ?? false,
      input.description
    )
  }

  static restore(input: RestoreCombo): Combo {
    return new Combo(
      input.id,
      input.name,
      input.isActive,
      input.restaurantId,
      input.categoryId,
      input.price,
      input.stock,
      input.discount,
      input.medias,
      input.items,
      input.optionals,
      input.useCategoryOptionals,
      input.description,
      input.createdAt,
      input.updatedAt
    )
  }

  update(input: Partial<Combo>): void {
    this.name = input.name ?? this.name
    this.isActive = input.isActive ?? this.isActive
    this.description = input.description ?? this.description
    this.categoryId = input.categoryId ?? this.categoryId
    this.price = input.price ?? this.price
    this.stock = input.stock ?? this.stock
    this.discount = input.discount ?? this.discount
    this.items = input.items ?? this.items
    this.optionals = input.optionals ?? this.optionals
    this.useCategoryOptionals = input.useCategoryOptionals ?? this.useCategoryOptionals
  }

  addMedia(media: string): void {
    this.medias.push(media)
  }

  removeMedia(media: string): void {
    this.medias = this.medias.filter((m) => m !== media)
  }

  addItem(item: ComboItem): void {
    this.items.push(item)
  }

  removeItem(menuItemId: string): void {
    this.items = this.items.filter((item) => item.menuItemId !== menuItemId)
  }

  updateItem(menuItemId: string, updates: Partial<ComboItem>): void {
    const item = this.items.find((i) => i.menuItemId === menuItemId)
    if (item) {
      Object.assign(item, updates)
    }
  }

  addOptional(optional: ComboOptional): void {
    this.optionals.push(optional)
  }

  removeOptional(optionalName: string): void {
    this.optionals = this.optionals.filter((o) => o.name !== optionalName)
  }

  updateOptional(optionalName: string, updates: Partial<ComboOptional>): void {
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

  getTotalItemsPrice(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  getDiscountedPrice(): number {
    return this.price - this.price * (this.discount / 100)
  }
}

export interface CreateCombo {
  name: string
  restaurantId: string
  categoryId: string
  price: number
  items: ComboItem[]
  stock?: number
  discount?: number
  medias?: string[]
  optionals?: ComboOptional[]
  useCategoryOptionals?: boolean
  description?: string
}

type RestoreCombo = CreateCombo & {
  id: string
  stock: number
  discount: number
  medias: string[]
  optionals: ComboOptional[]
  useCategoryOptionals: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
