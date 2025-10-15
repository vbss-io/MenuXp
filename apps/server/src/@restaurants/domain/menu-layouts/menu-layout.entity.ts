import type { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'
import { MenuLayoutStatus } from '@restaurants/domain/menu-layouts/enums/menu-layout-status.enum'
import { type MenuSectionConfig } from '@restaurants/domain/menu-layouts/types/section-configs.type'

export interface MenuSection {
  id?: string
  type: MenuSectionType
  config: MenuSectionConfig
}

export interface MenuLayout {
  id: string
  name: string
  description?: string
  restaurantId: string
  status: MenuLayoutStatus
  layout: string
  sections: MenuSection[]
  createdAt: Date
  updatedAt: Date
}

export interface CreateMenuLayout {
  name: string
  restaurantId: string
  description?: string
  sections?: MenuSection[]
  layout?: string
}

type RestoreMenuLayout = CreateMenuLayout & {
  id: string
  status: MenuLayoutStatus
  sections: MenuSection[]
  layout: string
  createdAt: Date
  updatedAt: Date
}

export class MenuLayoutEntity {
  id: string | undefined
  name: string
  description?: string
  status: MenuLayoutStatus
  sections: MenuSection[]
  layout: string

  private constructor(
    readonly _id: string | undefined,
    name: string,
    readonly restaurantId: string,
    status: MenuLayoutStatus,
    sections: MenuSection[],
    layout: string,
    description?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.id = _id
    this.name = name
    this.description = description
    this.status = status
    this.sections = sections
    this.layout = layout
  }

  static create(input: CreateMenuLayout): MenuLayoutEntity {
    return new MenuLayoutEntity(
      undefined,
      input.name,
      input.restaurantId,
      MenuLayoutStatus.ACTIVE,
      input.sections ?? [],
      input.layout ?? 'default',
      input.description
    )
  }

  static restore(input: RestoreMenuLayout): MenuLayoutEntity {
    return new MenuLayoutEntity(
      input.id,
      input.name,
      input.restaurantId,
      input.status,
      input.sections,
      input.layout,
      input.description,
      input.createdAt,
      input.updatedAt
    )
  }

  update(input: Partial<MenuLayoutEntity>): void {
    this.name = input.name ?? this.name
    this.description = input.description ?? this.description
    this.status = input.status ?? this.status
    this.sections = input.sections ?? this.sections
    this.layout = input.layout ?? this.layout
  }

  activate(): void {
    this.status = MenuLayoutStatus.ACTIVE
  }

  deactivate(): void {
    this.status = MenuLayoutStatus.INACTIVE
  }
}
