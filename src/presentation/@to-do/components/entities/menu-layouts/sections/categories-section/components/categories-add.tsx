import { CheckIcon, FolderIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetRestaurantMenuCategoriesUsecase } from '@/application/clients-menu/get-restaurant-menu-categories.usecase'
import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import { ICONS_KEYS, ICONS } from '@/domain/consts/icons.const.tsx'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from '../styles'

interface CategoryData {
  id: string
  name: string
  description?: string
  icon?: string
}

interface CategoriesAddProps {
  layoutId: string
  position: number
  onSectionUpdated?: () => void
  onClose?: () => void
}

export const CategoriesAdd: React.FC<CategoriesAddProps> = ({
  layoutId,
  position,
  onSectionUpdated,
  onClose
}) => {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [tempSelectedCategoryIds, setTempSelectedCategoryIds] = useState<string[]>([])
  const [tempIsAllCategories, setTempIsAllCategories] = useState(false)
  const { restaurant } = useRestaurant()

  // Cor primária do restaurante ou fallback para MenuXP
  const primaryColor = restaurant?.style?.primaryColor || '#FF6B35'
  const secondaryColor = restaurant?.style?.secondaryColor || '#FF8C00'

  // Carrega todas as categorias disponíveis
  const loadAllCategories = useCallback(async () => {
    if (!restaurant?.id) return

    setIsLoading(true)
    try {
      const getCategoriesUsecase = new GetRestaurantMenuCategoriesUsecase()
      const result = await getCategoriesUsecase.execute({
        restaurantId: restaurant.id
      })
      setCategories(result.categories)
    } catch {
      toast.error('Erro ao carregar categorias')
    } finally {
      setIsLoading(false)
    }
  }, [restaurant?.id])

  useEffect(() => {
    loadAllCategories()
  }, [loadAllCategories])

  const handleAddSection = async () => {
    if (!layoutId || position === undefined || position === null) {
      toast.error('Erro: informações de layout inválidas')
      return
    }

    setIsLoading(true)
    try {
      const addSectionUsecase = new AddSectionUsecase()
      const newSection: MenuSection = {
        type: MenuSectionType.CATEGORIES,
        config: {
          categoryIds: tempIsAllCategories ? null : tempSelectedCategoryIds
        }
      }

      await addSectionUsecase.execute({
        layoutId,
        section: newSection,
        position
      })

      onSectionUpdated?.()
      onClose?.()
      toast.success('Seção de categorias adicionada com sucesso!')
    } catch {
      toast.error('Erro ao adicionar seção de categorias')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryToggle = (categoryId: string) => {
    if (tempIsAllCategories) return

    setTempSelectedCategoryIds((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const handleSelectAllCategories = () => {
    setTempIsAllCategories(true)
    setTempSelectedCategoryIds([])
  }

  const handleSelectSpecificCategories = () => {
    setTempIsAllCategories(false)
    setTempSelectedCategoryIds([])
  }

  const getIconComponent = (iconKey?: string) => {
    if (!iconKey || !(iconKey in ICONS_KEYS)) return <FolderIcon size={20} />
    const iconName = ICONS_KEYS[iconKey]
    const IconComponent = ICONS[iconName as keyof typeof ICONS]
    return IconComponent ? <IconComponent size={20} /> : <FolderIcon size={20} />
  }

  const renderCategoryCard = (category: CategoryData) => {
    const isSelected = tempSelectedCategoryIds.includes(category.id)
    const iconElement = getIconComponent(category.icon)

    return (
      <S.CategoryCard key={category.id} selected={isSelected} onClick={() => handleCategoryToggle(category.id)}>
        <S.CategoryIcon>{iconElement}</S.CategoryIcon>
        <S.CategoryInfo>
          <S.CategoryName>{category.name}</S.CategoryName>
          {category.description && <S.CategoryDescription>{category.description}</S.CategoryDescription>}
        </S.CategoryInfo>
        {isSelected && (
          <S.SelectedIndicator>
            <CheckIcon size={16} />
          </S.SelectedIndicator>
        )}
      </S.CategoryCard>
    )
  }

  return (
    <S.EditContainer>
      <S.EditHeader>
        <S.EditTitle>
          <FolderIcon size={20} />
          <span>Adicionar Seção de Categorias</span>
        </S.EditTitle>
      </S.EditHeader>

      <S.EditContent>
        <div style={{ marginBottom: '16px' }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Configure quais categorias serão exibidas nesta seção do menu.
          </p>
        </div>

        <S.FormFields>
          <S.FormField>
            <label style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Tipo de seleção
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                variant={tempIsAllCategories ? 'default' : 'ghost'}
                size="sm"
                onClick={handleSelectAllCategories}
                disabled={isLoading}
              >
                Todas as categorias
              </Button>
              <Button
                variant={!tempIsAllCategories ? 'default' : 'ghost'}
                size="sm"
                onClick={handleSelectSpecificCategories}
                disabled={isLoading}
              >
                Categorias específicas
              </Button>
            </div>
          </S.FormField>

          {tempIsAllCategories ? (
            <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Todas as categorias do restaurante serão exibidas automaticamente.
              </p>
            </div>
          ) : (
            <S.FormField>
              <label style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Selecionar categorias ({tempSelectedCategoryIds.length} selecionadas)
              </label>
              {isLoading ? (
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <S.LoadingSpinner />
                  <span style={{ marginLeft: '8px' }}>Carregando categorias...</span>
                </div>
              ) : (
                <S.CategoriesSelectionGrid>
                  {categories.map((category) => renderCategoryCard(category))}
                </S.CategoriesSelectionGrid>
              )}
            </S.FormField>
          )}
        </S.FormFields>

        {isLoading && (
          <S.UploadingOverlay>
            <S.LoadingSpinner />
            <span>Adicionando seção...</span>
          </S.UploadingOverlay>
        )}

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleAddSection} disabled={isLoading}>
            {isLoading ? 'Adicionando...' : 'Adicionar Seção'}
          </Button>
        </div>
      </S.EditContent>
    </S.EditContainer>
  )
}
