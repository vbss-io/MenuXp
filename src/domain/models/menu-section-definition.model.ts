import type { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'

export interface MenuSectionDefinition {
  type: MenuSectionType
  name: string
  description: string
  configSchema: Record<
    string,
    {
      type: 'string' | 'number' | 'boolean' | 'array'
      required: boolean
      description: string
      default?: unknown
    }
  >
  isActive: boolean
}
