import { MenuSectionType } from '@restaurants/domain/menu-layouts/enums/menu-layout-section-type.enum'

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

export const MENU_SECTIONS: MenuSectionDefinition[] = [
  {
    type: MenuSectionType.BANNER,
    name: 'Banner',
    description: 'Seção de banner com imagem principal do menu',
    configSchema: {
      imagePath: {
        type: 'string',
        required: true,
        description: 'Caminho da imagem do banner'
      },
      tag: {
        type: 'string',
        required: false,
        description: 'Tag do banner (máximo 50 caracteres)'
      },
      title: {
        type: 'string',
        required: false,
        description: 'Título do banner (máximo 100 caracteres)'
      },
      subtitle: {
        type: 'string',
        required: false,
        description: 'Subtítulo do banner (máximo 200 caracteres)'
      }
    },
    isActive: true
  },
  {
    type: MenuSectionType.CAROUSEL,
    name: 'Carousel',
    description: 'Seção de carousel com múltiplas imagens (2-5 imagens)',
    configSchema: {
      imagePaths: {
        type: 'array',
        required: true,
        description: 'Array de caminhos das imagens do carousel (min: 2, max: 5)'
      }
    },
    isActive: true
  },
  {
    type: MenuSectionType.CATEGORIES,
    name: 'Categorias',
    description: 'Seção que exibe categorias de produtos',
    configSchema: {
      categoryIds: {
        type: 'array',
        required: false,
        description: 'IDs das categorias específicas (null = todas as categorias ativas)',
        default: null
      }
    },
    isActive: true
  },
  {
    type: MenuSectionType.MENU_ITEMS,
    name: 'Itens do Menu',
    description: 'Seção que exibe itens do menu com diferentes tipos de exibição',
    configSchema: {
      type: {
        type: 'string',
        required: true,
        description: 'Tipo de exibição: custom, best_sellers, discounts',
        default: 'custom'
      },
      title: {
        type: 'string',
        required: false,
        description: 'Título da seção (opcional, tem defaults baseados no tipo)',
        default: ''
      },
      menuItemIds: {
        type: 'array',
        required: false,
        description: 'IDs dos itens específicos (apenas para tipo custom)',
        default: null
      }
    },
    isActive: true
  },
  {
    type: MenuSectionType.COMBOS,
    name: 'Combos',
    description: 'Seção que exibe combos promocionais com diferentes tipos de exibição',
    configSchema: {
      type: {
        type: 'string',
        required: true,
        description: 'Tipo de exibição: custom, best_sellers, discounts',
        default: 'custom'
      },
      title: {
        type: 'string',
        required: false,
        description: 'Título da seção (opcional, tem defaults baseados no tipo)',
        default: ''
      },
      comboIds: {
        type: 'array',
        required: false,
        description: 'IDs dos combos específicos (apenas para tipo custom)',
        default: null
      }
    },
    isActive: true
  }
]

export const SECTION_WITH_MEDIA = [MenuSectionType.BANNER, MenuSectionType.CAROUSEL]
