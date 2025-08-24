import { CheckIcon, FolderIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetRestaurantMenuCategoriesUsecase } from '@/application/clients-menu/get-restaurant-menu-categories.usecase'
import { UpdateCategoriesSectionUsecase } from '@/application/menu-layouts/sections/update-categories-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { ICONS_KEYS, ICONS } from '@/domain/consts/icons.const.tsx'
import { validateSection, getCategoriesConfig } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from '../styles'

interface CategoryData {
  id: string
  name: string
  description?: string
  icon?: string
}

interface CategoriesEditProps {
  section: MenuSection
  layoutId: string
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
}

export const CategoriesEdit: React.FC<CategoriesEditProps> = ({
  section,
  layoutId,
  onSectionUpdated,
  onClose,
  sectionDefinitions = []
}) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [tempSelectedCategories, setTempSelectedCategories] = useState<CategoryData[]>([])
  const [tempIsAllCategories, setTempIsAllCategories] = useState(false)
  const [tempSelectedCategoryIds, setTempSelectedCategoryIds] = useState<string[]>([])
  const { restaurant } = useRestaurant()

  const categoriesData = getCategoriesConfig(section)
  const isAllCategories =
    categoriesData?.categoryIds === null || categoriesData?.categoryIds === undefined

  // Cor primária do restaurante ou fallback para MenuXP
  const primaryColor = restaurant?.style?.primaryColor || '#FF6B35'
  const secondaryColor = restaurant?.style?.secondaryColor || '#FF8C00'

  useEffect(() => {
    if (sectionDefinitions.length > 0 && section) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions])

  // Inicializa estados para modo edit
  useEffect(() => {
    setTempIsAllCategories(isAllCategories)
    if (!isAllCategories && categoriesData?.categoryIds) {
      setTempSelectedCategoryIds(categoriesData.categoryIds)
    }
  }, [isAllCategories, categoriesData?.categoryIds])

  // Carrega categorias selecionadas para modo edit
  useEffect(() => {
    const loadCategoriesForEdit = async () => {
      if (!isAllCategories && categoriesData?.categoryIds && restaurant?.id) {
        try {
          const getCategoriesUsecase = new GetRestaurantMenuCategoriesUsecase()
          const result = await getCategoriesUsecase.execute({
            restaurantId: restaurant.id,
            categoryIds: categoriesData.categoryIds
          })
          setTempSelectedCategories(result.categories)
        } catch {
          toast.error('Erro ao carregar categorias')
        }
      }
    }

    loadCategoriesForEdit()
  }, [isAllCategories, categoriesData?.categoryIds, restaurant?.id])

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

  const handleSaveChanges = async () => {
    if (!section?.id || !layoutId) {
      toast.error('Erro: informações da seção inválidas')
      return
    }

    setIsLoading(true)
    try {
      const updateCategoriesUsecase = new UpdateCategoriesSectionUsecase()
      await updateCategoriesUsecase.execute({
        layoutId,
        sectionId: section.id,
        categoryIds: tempIsAllCategories ? null : tempSelectedCategoryIds
      })

      onSectionUpdated?.()
      onClose?.()
      toast.success('Categorias atualizadas com sucesso!')
    } catch {
      toast.error('Erro ao atualizar categorias')
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
    setTempSelectedCategories([])
  }

  const handleSelectSpecificCategories = () => {
    setTempIsAllCategories(false)
    setTempSelectedCategoryIds([])
    setTempSelectedCategories([])
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
          <span>Editar Seção de Categorias</span>
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
            <span>Salvando alterações...</span>
          </S.UploadingOverlay>
        )}

        {validationErrors.length > 0 && (
          <S.ValidationErrors>
            {validationErrors.map((error, index) => (
              <S.ValidationError key={index}>
                <WarningIcon size={16} />
                <span>{error}</span>
              </S.ValidationError>
            ))}
          </S.ValidationErrors>
        )}

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSaveChanges} disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </S.EditContent>
    </S.EditContainer>
  )
}
