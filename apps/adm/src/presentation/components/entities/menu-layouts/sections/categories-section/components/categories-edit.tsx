import { WarningIcon, XIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { GetCategoriesUsecase } from '@/application/categories/get-categories.usecase'
import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { UpdateCategoriesSectionUsecase } from '@/application/menu-layouts/sections/update-categories-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { Button } from '@menuxp/ui'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { Loading } from '@/presentation/components/ui/loading'
import { getCategoriesConfig, validateSection } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'

import * as S from '../styles'

interface CategoryData {
  id: string
  name: string
  description?: string
  icon?: string
}

interface CategoriesEditProps {
  section?: MenuSection
  layoutId: string
  position?: number
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
}

export const CategoriesEdit: React.FC<CategoriesEditProps> = ({
  section,
  layoutId,
  position,
  onSectionUpdated,
  onClose,
  sectionDefinitions = []
}) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [selectedCategories, setSelectedCategories] = useState<CategoryData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [tempIsAllCategories, setTempIsAllCategories] = useState(false)
  const [tempSelectedCategoryIds, setTempSelectedCategoryIds] = useState<string[]>([])
  const { restaurant } = useRestaurant()

  const isEditing = !!section
  const categoriesData = section ? getCategoriesConfig(section) : null
  const isAllCategories = categoriesData?.categoryIds === null || categoriesData?.categoryIds === undefined

  useEffect(() => {
    if (sectionDefinitions.length > 0 && section && isEditing) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions, isEditing])

  useEffect(() => {
    if (isEditing) {
      setTempIsAllCategories(isAllCategories)
      if (!isAllCategories && categoriesData?.categoryIds) {
        setTempSelectedCategoryIds(categoriesData.categoryIds)
      }
    }
  }, [isAllCategories, categoriesData?.categoryIds, isEditing])

  const loadAllCategories = useCallback(async () => {
    if (!restaurant?.id) return

    setIsLoading(true)
    try {
      const getCategoriesUsecase = new GetCategoriesUsecase()
      const result = await getCategoriesUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })
      const allCategories = result.flatMap((category) => [category, ...(category.subCategories || [])])
      setCategories(allCategories)
    } catch {
      toast.error('Erro ao carregar categorias')
    } finally {
      setIsLoading(false)
    }
  }, [restaurant?.id])

  useEffect(() => {
    loadAllCategories()
  }, [loadAllCategories])

  const handleCategorySearch = async (searchTerm: string): Promise<ComboboxOption[]> => {
    if (!restaurant?.id) return []

    try {
      const getCategoriesNamesUsecase = new GetCategoriesNamesUsecase()
      const categoriesData = await getCategoriesNamesUsecase.execute({
        restaurantId: restaurant.id,
        searchMask: searchTerm
      })

      return categoriesData
        .filter((cat) => !tempSelectedCategoryIds.includes(cat.id))
        .map((cat) => ({
          label: cat.name,
          value: cat.id,
          icon: cat.icon
        }))
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }
  }

  const handleCategorySelect = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (category && !tempSelectedCategoryIds.includes(categoryId)) {
      setTempSelectedCategoryIds((prev) => [...prev, categoryId])
      setSelectedCategories((prev) => [...prev, category])
    }
  }

  const handleCategoryRemove = (categoryId: string) => {
    setTempSelectedCategoryIds((prev) => prev.filter((id) => id !== categoryId))
    setSelectedCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
  }

  const loadSelectedCategories = useCallback(async () => {
    if (!restaurant?.id || !categoriesData?.categoryIds || categoriesData.categoryIds.length === 0) return

    try {
      const getCategoriesUsecase = new GetCategoriesUsecase()
      const result = await getCategoriesUsecase.execute({
        restaurantId: restaurant.id,
        includeInactive: false
      })
      const allCategories = result.flatMap((category) => [category, ...(category.subCategories || [])])
      const selectedCategories = allCategories.filter((cat) => categoriesData.categoryIds?.includes(cat.id))
      setSelectedCategories(selectedCategories)
    } catch {
      toast.error('Erro ao carregar categorias selecionadas')
    }
  }, [restaurant?.id, categoriesData?.categoryIds])

  useEffect(() => {
    if (isEditing && !tempIsAllCategories && categoriesData?.categoryIds) {
      loadSelectedCategories()
    }
  }, [loadSelectedCategories, tempIsAllCategories, categoriesData?.categoryIds, isEditing])

  const handleSave = async () => {
    if (!layoutId) {
      toast.error('Erro: informações de layout inválidas')
      return
    }

    if (isEditing) {
      if (!section?.id) {
        toast.error('Erro: informações da seção inválidas')
        return
      }
    } else {
      if (position === undefined || position === null) {
        toast.error('Erro: posição da seção inválida')
        return
      }
    }

    setIsLoading(true)
    try {
      if (isEditing) {
        const updateCategoriesUsecase = new UpdateCategoriesSectionUsecase()
        await updateCategoriesUsecase.execute({
          layoutId,
          sectionId: section!.id!,
          categoryIds: tempIsAllCategories ? null : tempSelectedCategoryIds
        })
        toast.success('Categorias atualizadas com sucesso!')
      } else {
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
          position: position!
        })
        toast.success('Seção de categorias adicionada com sucesso!')
      }
      onSectionUpdated?.()
      onClose?.()
    } catch {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'adicionar'} categorias`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectAllCategories = () => {
    if (tempIsAllCategories) return
    setTempIsAllCategories(true)
    setTempSelectedCategoryIds([])
    setSelectedCategories([])
  }

  const handleSelectSpecificCategories = () => {
    if (!tempIsAllCategories) return
    setTempIsAllCategories(false)
    setTempSelectedCategoryIds([])
    setSelectedCategories([])
  }

  const getButtonText = () => {
    if (isLoading) return <Loading />
    return isEditing ? 'Salvar Alterações' : 'Adicionar Seção'
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <S.EditContainer variants={containerVariants} initial="hidden" animate="visible">
      <S.EditContent>
        <S.Description>
          {isEditing
            ? 'Configure quais categorias serão exibidas nesta seção do menu.'
            : 'Configure quais categorias serão exibidas na nova seção do menu.'}
        </S.Description>
        <S.FormFields variants={formVariants}>
          <S.FormField>
            <S.FormLabel>Tipo de seleção</S.FormLabel>
            <S.SelectionButtons>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={tempIsAllCategories ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={handleSelectAllCategories}
                  disabled={isLoading}
                >
                  Todas as categorias
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={!tempIsAllCategories ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={handleSelectSpecificCategories}
                  disabled={isLoading}
                >
                  Categorias específicas
                </Button>
              </motion.div>
            </S.SelectionButtons>
          </S.FormField>
          {tempIsAllCategories ? (
            <S.InfoBox>
              <p>Todas as categorias do restaurante serão exibidas automaticamente.</p>
            </S.InfoBox>
          ) : (
            <>
              <S.FormField>
                <S.FormLabel>Adicionar categoria</S.FormLabel>
                <Combobox
                  placeholder="Digite para buscar categorias..."
                  onSearch={handleCategorySearch}
                  onChange={handleCategorySelect}
                />
              </S.FormField>
              {selectedCategories.length > 0 && (
                <S.FormField>
                  <S.FormLabel>Categorias selecionadas ({selectedCategories.length})</S.FormLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedCategories.map((category) => (
                      <div
                        key={category.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div>
                          <S.CategoryName>{category.name}</S.CategoryName>
                          {category.description && (
                            <S.CategoryDescription>{category.description}</S.CategoryDescription>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCategoryRemove(category.id)}
                          style={{ minWidth: '32px', height: '32px', padding: '0' }}
                        >
                          <XIcon size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </S.FormField>
              )}
            </>
          )}
        </S.FormFields>
        {isLoading && (
          <S.UploadingOverlay>
            <Loading />
            <span>{isEditing ? 'Salvando alterações...' : 'Adicionando seção...'}</span>
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
        <S.ModalFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSave} disabled={isLoading}>
              {getButtonText()}
            </Button>
          </motion.div>
        </S.ModalFooter>
      </S.EditContent>
    </S.EditContainer>
  )
}
