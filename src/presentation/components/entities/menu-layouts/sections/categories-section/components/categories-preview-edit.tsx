import { FolderIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

import { GetCategoriesUsecase } from '@/application/categories/get-categories.usecase'
import { ICONS, ICONS_KEYS } from '@/domain/consts/icons.const.tsx'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import { Button } from '@/presentation/components/ui/button'
import { getCategoriesConfig } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from '../styles'

interface CategoryData {
  id: string
  name: string
  description?: string
  icon?: string
}

interface CategoriesPreviewEditProps {
  section: MenuSection
  onEdit?: () => void
  onRemove?: () => void
  menuLayout?: string
}

export const CategoriesPreviewEdit: React.FC<CategoriesPreviewEditProps> = ({ section, onEdit, onRemove }) => {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const { restaurant } = useRestaurant()

  const categoriesData = getCategoriesConfig(section)
  const isAllCategories = categoriesData?.categoryIds === null || categoriesData?.categoryIds === undefined

  const loadCategories = useCallback(async () => {
    if (!restaurant?.id) return
    const getCategoriesUsecase = new GetCategoriesUsecase()
    const result = await getCategoriesUsecase.execute({
      restaurantId: restaurant.id,
      includeInactive: false
    })
    const allCategories = result.flatMap((category) => [category, ...(category.subCategories || [])])
    setCategories(allCategories)
  }, [restaurant?.id])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const getIconComponent = (iconKey?: string) => {
    if (!iconKey || !(iconKey in ICONS_KEYS)) return <FolderIcon size={16} />
    const iconName = ICONS_KEYS[iconKey]
    const IconComponent = ICONS[iconName as keyof typeof ICONS]
    return IconComponent ? <IconComponent size={16} /> : <FolderIcon size={16} />
  }

  const selectedCategories = isAllCategories
    ? categories
    : categories.filter((cat) => categoriesData?.categoryIds?.includes(cat.id))

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewTitle>
              <FolderIcon size={20} />
              <span>Categorias</span>
            </S.PreviewTitle>
            <S.ActionButtons>
              {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <PencilIcon size={16} />
                </Button>
              )}
              {onRemove && (
                <Button variant="outline" size="sm" onClick={onRemove}>
                  <TrashIcon size={16} />
                </Button>
              )}
            </S.ActionButtons>
          </S.PreviewHeader>
          <S.PreviewContent>
            {!isAllCategories && selectedCategories.length > 0 && (
              <S.CategoriesPreviewList>
                {selectedCategories.map((category) => (
                  <S.CategoryPreviewItem key={category.id}>
                    <S.CategoryPreviewIcon>{getIconComponent(category.icon)}</S.CategoryPreviewIcon>
                    <S.CategoryPreviewName>{category.name}</S.CategoryPreviewName>
                  </S.CategoryPreviewItem>
                ))}
              </S.CategoriesPreviewList>
            )}
            <S.ConfigurationPreview>
              <S.ConfigurationItem>
                <S.ConfigurationLabel>Tipo:</S.ConfigurationLabel>
                <S.ConfigurationValue>
                  {isAllCategories ? 'Todas as categorias' : 'Categorias específicas'}
                </S.ConfigurationValue>
              </S.ConfigurationItem>
              <S.ConfigurationItem>
                <S.ConfigurationLabel>Quantidade:</S.ConfigurationLabel>
                <S.ConfigurationValue>
                  {isAllCategories ? `${categories.length} categorias` : `${selectedCategories.length} selecionadas`}
                </S.ConfigurationValue>
              </S.ConfigurationItem>
            </S.ConfigurationPreview>
          </S.PreviewContent>
        </S.PreviewContainer>
      </motion.div>
    </AnimatePresence>
  )
}
