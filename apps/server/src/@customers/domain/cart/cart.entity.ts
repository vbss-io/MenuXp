export interface CartItem {
  itemId: string
  name: string
  price: number
  quantity: number
  itemType: 'menu-item' | 'combo'
  optionals?: {
    name: string
    price: number
    quantity: number
  }[]
  note?: string
}

export class Cart {
  items: CartItem[]
  total: number
  itemCount: number

  private constructor(
    readonly id: string | undefined,
    readonly clientId: string | undefined,
    readonly sessionId: string | undefined,
    readonly restaurantId: string,
    items: CartItem[],
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.items = items
    this.total = Cart.calculateTotal(items)
    this.itemCount = Cart.calculateItemCount(items)
  }

  static create(input: CreateCart): Cart {
    return new Cart(undefined, input.clientId, input.sessionId, input.restaurantId, input.items ?? [])
  }

  static restore(input: RestoreCart): Cart {
    return new Cart(
      input.id,
      input.clientId,
      input.sessionId,
      input.restaurantId,
      input.items,
      input.createdAt,
      input.updatedAt
    )
  }

  addItem(item: CartItem): void {
    this.items.push(item)
    this.updateTotals()
  }

  updateItemQuantity(itemId: string, quantity: number, optionals?: CartItem['optionals'], note?: string): void {
    if (quantity <= 0) {
      this.items = this.items.filter((item) => {
        if (item.itemId !== itemId) return true
        if (!item.optionals && !optionals) return false
        if (!item.optionals || !optionals) return true
        if (item.optionals.length !== optionals.length) return true
        if (item.note !== note) return true
        return !item.optionals.every((cartOpt, index) => {
          const itemOpt = optionals[index]
          return (
            cartOpt.name === itemOpt.name && cartOpt.price === itemOpt.price && cartOpt.quantity === itemOpt.quantity
          )
        })
      })
    } else {
      const itemKey = this.getItemKey(optionals, note)
      const key = `${itemId}-${itemKey}`
      const matchingItems = this.items.filter((item) => {
        if (item.itemId !== itemId) return false
        const itemItemKey = this.getItemKey(item.optionals, item.note)
        return `${item.itemId}-${itemItemKey}` === key
      })
      if (matchingItems.length > 0) {
        this.items = this.items.filter((item) => {
          if (item.itemId !== itemId) return true
          const itemItemKey = this.getItemKey(item.optionals, item.note)
          return `${item.itemId}-${itemItemKey}` !== key
        })
        const firstItem = matchingItems[0]
        this.items.push({
          itemId: firstItem.itemId,
          name: firstItem.name,
          price: firstItem.price,
          quantity: quantity,
          itemType: firstItem.itemType,
          optionals: firstItem.optionals ? [...firstItem.optionals] : undefined,
          note: firstItem.note
        })
      }
    }
    this.updateTotals()
  }

  removeItem(itemId: string, optionals?: CartItem['optionals'], note?: string): void {
    const itemIndex = this.findItemIndex(itemId, optionals, note)
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1)
      this.updateTotals()
    }
  }

  private findItemIndex(itemId: string, optionals?: CartItem['optionals'], note?: string): number {
    return this.items.findIndex((cartItem) => {
      if (cartItem.itemId !== itemId) return false
      if (cartItem.note !== note) return false
      if (!cartItem.optionals && !optionals) return true
      if (!cartItem.optionals || !optionals) return false
      if (cartItem.optionals.length !== optionals.length) return false
      return cartItem.optionals.every((cartOpt, index) => {
        const itemOpt = optionals[index]
        return cartOpt.name === itemOpt.name && cartOpt.price === itemOpt.price && cartOpt.quantity === itemOpt.quantity
      })
    })
  }

  clear(): void {
    this.items = []
    this.updateTotals()
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  updateTotals(): void {
    this.total = Cart.calculateTotal(this.items)
    this.itemCount = Cart.calculateItemCount(this.items)
  }

  private static calculateTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity
      const optionalsTotal = (item.optionals ?? []).reduce((optSum, opt) => optSum + opt.price * opt.quantity, 0)
      return sum + itemTotal + optionalsTotal
    }, 0)
  }

  private static calculateItemCount(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  getItemById(itemId: string): CartItem | undefined {
    return this.items.find((item) => item.itemId === itemId)
  }

  hasItem(itemId: string): boolean {
    return this.items.some((item) => item.itemId === itemId)
  }

  getGroupedItems(): CartItem[] {
    const groupedMap = new Map<string, CartItem>()
    this.items.forEach((item) => {
      const itemKey = this.getItemKey(item.optionals, item.note)
      const key = `${item.itemId}-${itemKey}`
      if (groupedMap.has(key)) {
        const existingItem = groupedMap.get(key)
        if (existingItem) {
          existingItem.quantity += item.quantity
        }
      } else {
        groupedMap.set(key, {
          itemId: item.itemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          itemType: item.itemType,
          optionals: item.optionals ? [...item.optionals] : undefined,
          note: item.note
        })
      }
    })
    return Array.from(groupedMap.values()).sort((a, b) => this.compareCartItems(a, b))
  }

  private getItemKey(optionals?: CartItem['optionals'], note?: string): string {
    const optionalsKey = this.getOptionalsKey(optionals)
    const noteKey = note ? `note-${note}` : 'no-note'
    return `${optionalsKey}|${noteKey}`
  }

  private getOptionalsKey(optionals?: CartItem['optionals']): string {
    if (!optionals || optionals.length === 0) return 'no-optionals'
    const sortedOptionals = [...optionals].sort((a, b) => a.name.localeCompare(b.name))
    return sortedOptionals.map((opt) => `${opt.name}-${opt.price}-${opt.quantity}`).join('|')
  }

  private compareCartItems(a: CartItem, b: CartItem): number {
    const nameComparison = a.name.localeCompare(b.name)
    if (nameComparison !== 0) return nameComparison
    const optionalsComparison = this.compareOptionals(a.optionals, b.optionals)
    if (optionalsComparison !== 0) return optionalsComparison
    const noteA = a.note || ''
    const noteB = b.note || ''
    return noteA.localeCompare(noteB)
  }

  private compareOptionals(optionalsA?: CartItem['optionals'], optionalsB?: CartItem['optionals']): number {
    if (!optionalsA && !optionalsB) return 0
    if (!optionalsA) return -1
    if (!optionalsB) return 1
    if (optionalsA.length !== optionalsB.length) {
      return optionalsA.length - optionalsB.length
    }
    const sortedA = [...optionalsA].sort((a, b) => a.name.localeCompare(b.name))
    const sortedB = [...optionalsB].sort((a, b) => a.name.localeCompare(b.name))
    for (let i = 0; i < sortedA.length; i++) {
      const optA = sortedA[i]
      const optB = sortedB[i]
      const nameComparison = optA.name.localeCompare(optB.name)
      if (nameComparison !== 0) return nameComparison
      if (optA.price !== optB.price) return optA.price - optB.price
      if (optA.quantity !== optB.quantity) return optA.quantity - optB.quantity
    }
    return 0
  }
}

export interface CreateCart {
  clientId?: string
  sessionId?: string
  restaurantId: string
  items?: CartItem[]
}

type RestoreCart = CreateCart & {
  id: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}
