import { CheckIcon, FolderIcon, PencilIcon, TrashIcon, WarningIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { GetRestaurantMenuCategoriesUsecase } from '@/application/clients-menu/get-restaurant-menu-categories.usecase'
import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { UpdateCategoriesSectionUsecase } from '@/application/menu-layouts/sections/update-categories-section.usecase'
import { AddSectionUsecase } from '@/application/menu-layouts/sections/add-section.usecase'
import { MenuSectionType } from '@/domain/enums/menu-layouts/menu-section-type.enum'
import type { MenuSection } from '@/domain/models/menu-layout.model'
import type { MenuSectionDefinition } from '@/domain/models/menu-section-definition.model'
import { ICONS_KEYS, ICONS } from '@/domain/consts/icons.const'
import { validateSection } from '@/presentation/hooks/use-menu-layouts'
import { useRestaurant } from '@/presentation/hooks/use-restaurant'
import { Combobox } from '@/presentation/components/ui/combobox'

import * as S from './styles'

type CategoriesSectionMode = 'view' | 'preview-edit' | 'edit' | 'add'

interface CategoriesSectionProps {
  section?: MenuSection
  mode: CategoriesSectionMode
  onRemove?: () => void
  onEdit?: () => void
  onSectionUpdated?: () => void
  onClose?: () => void
  sectionDefinitions?: MenuSectionDefinition[]
  layoutId?: string
  position?: number
  menuLayout?: string // Layout do menu (default, dark, clean, square)
}

interface CategoryData {
  id: string
  name: string
  description?: string
  icon?: string
}

export const CategoriesSection = ({
  section,
  mode,
  onRemove,
  onEdit,
  onSectionUpdated,
  onClose: _onClose,
  sectionDefinitions = [],
  layoutId,
  position: _position,
  menuLayout
}: CategoriesSectionProps) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [tempSelectedCategories, setTempSelectedCategories] = useState<CategoryData[]>([])
  const [tempIsAllCategories, setTempIsAllCategories] = useState(false)
  const [tempSelectedCategoryIds, setTempSelectedCategoryIds] = useState<string[]>([])
  const { restaurant } = useRestaurant()

  // Estados para drag horizontal
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const isAllCategories = section?.config.categoryIds === null || section?.config.categoryIds === undefined
  const layoutType = menuLayout || 'default'

  // Cor primária do restaurante ou fallback para MenuXP
  const primaryColor = restaurant?.style?.primaryColor || '#FF6B35'
  const secondaryColor = restaurant?.style?.secondaryColor || '#FF8C00'

  // Funções para drag horizontal
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      e.preventDefault()
      const x = e.pageX - containerRef.current.offsetLeft
      const walk = (x - startX) * 2 // Velocidade do scroll
      containerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Event listeners para drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  useEffect(() => {
    if (sectionDefinitions.length > 0 && section) {
      const validation = validateSection(section, sectionDefinitions)
      setValidationErrors(validation.errors)
    }
  }, [section, sectionDefinitions])

  // Carrega categorias apenas para exibição (modos view e preview-edit)
  const loadCategoriesForDisplay = useCallback(async () => {
    if (!restaurant?.id || (mode !== 'view' && mode !== 'preview-edit')) return

    console.log('CategoriesSection - loadCategoriesForDisplay called:', {
      restaurantId: restaurant.id,
      mode,
      isAllCategories,
      sectionCategoryIds: section?.config.categoryIds,
      categoryIdsToFetch: isAllCategories ? undefined : section?.config.categoryIds || undefined
    })

    setIsLoading(true)
    try {
      const getCategoriesUsecase = new GetRestaurantMenuCategoriesUsecase()
      const result = await getCategoriesUsecase.execute({
        restaurantId: restaurant.id,
        categoryIds: isAllCategories ? undefined : section?.config.categoryIds || undefined
      })
      
      console.log('CategoriesSection - loadCategoriesForDisplay result:', {
        categoriesCount: result.categories.length,
        categories: result.categories.map(c => ({ id: c.id, name: c.name }))
      })
      
      setCategories(result.categories)
    } catch {
      toast.error('Erro ao carregar categorias')
    } finally {
      setIsLoading(false)
    }
  }, [restaurant?.id, mode, isAllCategories, section?.config.categoryIds])

  // Inicializa estados para modos edit/add
  useEffect(() => {
    if (mode === 'edit' || mode === 'add') {
      setTempIsAllCategories(isAllCategories)
      if (!isAllCategories && section?.config.categoryIds) {
        setTempSelectedCategoryIds(section.config.categoryIds)
        // Para modo edit, carrega categorias para mostrar as já selecionadas
        if (mode === 'edit' && restaurant?.id) {
          loadCategoriesForEdit()
        }
      }
    }
  }, [mode, isAllCategories, section?.config.categoryIds, restaurant?.id])

  // Carrega categorias para modo edit
  const loadCategoriesForEdit = useCallback(async () => {
    if (!restaurant?.id || !section?.config.categoryIds) return

    try {
      const getCategoriesUsecase = new GetRestaurantMenuCategoriesUsecase()
      const result = await getCategoriesUsecase.execute({
        restaurantId: restaurant.id,
        categoryIds: section.config.categoryIds
      })
      setTempSelectedCategories(result.categories)
    } catch {
      toast.error('Erro ao carregar categorias')
    }
  }, [restaurant?.id, section?.config.categoryIds])

  // Carrega categorias para exibição
  useEffect(() => {
    if (mode === 'view' || mode === 'preview-edit') {
      console.log('CategoriesSection - section?.config.categoryIds changed:', {
        mode,
        sectionId: section?.id,
        categoryIds: section?.config.categoryIds,
        isAllCategories
      })
      loadCategoriesForDisplay()
    }
  }, [loadCategoriesForDisplay, mode, section?.config.categoryIds])

  const handleSaveChanges = async () => {
    if (!section?.id || !layoutId) {
      console.error('Missing section.id or layoutId:', { sectionId: section?.id, layoutId })
      return
    }

    console.log('Saving changes with params:', {
      layoutId,
      sectionId: section.id,
      tempIsAllCategories,
      tempSelectedCategoryIds
    })

    setIsLoading(true)
    try {
      const categoryIds = tempIsAllCategories ? null : tempSelectedCategoryIds

      console.log('Calling UpdateCategoriesSectionUsecase with:', {
        layoutId,
        sectionId: section.id,
        categoryIds
      })

      const updateCategoriesUsecase = new UpdateCategoriesSectionUsecase()
      const result = await updateCategoriesUsecase.execute({
        layoutId,
        sectionId: section.id,
        categoryIds
      })

      console.log('Update categories result:', result)

      onSectionUpdated?.()
      _onClose?.()
      toast.success('Categorias atualizadas com sucesso!')
    } catch (error) {
      console.error('Error updating categories:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      })
      toast.error('Erro ao atualizar categorias')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddSection = async () => {
    if (!layoutId || _position === undefined || _position === null) {
      console.error('Missing layoutId or position:', { layoutId, _position })
      return
    }

    if (!tempIsAllCategories && tempSelectedCategoryIds.length === 0) {
      toast.error('Selecione pelo menos uma categoria ou marque "Todas as categorias"')
      return
    }

    console.log('Adding section with params:', {
      layoutId,
      position: _position,
      tempIsAllCategories,
      tempSelectedCategoryIds,
      menuLayout
    })

    setIsLoading(true)
    try {
      const addSectionUsecase = new AddSectionUsecase()
      const newSection = {
        type: MenuSectionType.CATEGORIES,
        config: {
          categoryIds: tempIsAllCategories ? null : tempSelectedCategoryIds
        }
      }

      console.log('New section object:', newSection)

      const result = await addSectionUsecase.execute({
        layoutId,
        section: newSection,
        position: _position
      })

      console.log('Add section result:', result)

      onSectionUpdated?.()
      _onClose?.()
      toast.success('Seção de categorias adicionada com sucesso!')
    } catch (error) {
      console.error('Error adding section:', error)
      toast.error('Erro ao adicionar seção de categorias')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategorySearch = async (searchTerm: string) => {
    if (!restaurant?.id) return []

    try {
      const getCategoriesNamesUsecase = new GetCategoriesNamesUsecase()
      const categoriesData = await getCategoriesNamesUsecase.execute({
        restaurantId: restaurant.id,
        searchMask: searchTerm,
        removeSubCategories: false
      })

      return categoriesData.map((cat) => ({
        label: cat.name,
        value: cat.id,
        displayLabel: cat.mainCategoryName ? `${cat.mainCategoryName} → ${cat.name}` : cat.name,
        icon: cat.icon
      }))
    } catch {
      console.error('Erro ao buscar categorias')
      return []
    }
  }

  const handleCategorySelect = async (categoryId: string) => {
    // Verificar se a categoria já foi selecionada
    if (tempSelectedCategoryIds.includes(categoryId)) {
      return
    }

    try {
      // Buscar dados completos da categoria selecionada
      const getCategoriesNamesUsecase = new GetCategoriesNamesUsecase()
      const categoriesData = await getCategoriesNamesUsecase.execute({
        restaurantId: restaurant!.id,
        searchMask: '', // Buscar todas para encontrar a categoria específica
        removeSubCategories: false
      })

      const selectedCategory = categoriesData.find((cat) => cat.id === categoryId)

      if (selectedCategory) {
        const newCategory: CategoryData = {
          id: categoryId,
          name: selectedCategory.name,
          icon: selectedCategory.icon || 'food' // Usar o ícone da categoria ou 'food' como padrão
        }

        setTempSelectedCategoryIds((prev) => [...prev, categoryId])
        setTempSelectedCategories((prev) => [...prev, newCategory])
      }
    } catch {
      toast.error('Erro ao buscar dados da categoria')
    }
  }

  const handleCategoryRemove = (categoryId: string) => {
    setTempSelectedCategoryIds((prev) => prev.filter((id) => id !== categoryId))
    setTempSelectedCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
  }

  const getCategoryIcon = (category: CategoryData) => {
    if (category.icon) {
      // Verificar se o ícone existe no sistema de ícones
      const iconKey = ICONS_KEYS[category.icon]
      if (iconKey && ICONS[iconKey]) {
        const IconComponent = ICONS[iconKey]
        // Tamanhos proporcionais para todos os layouts
        let iconSize = 20
        if (layoutType === 'default') iconSize = 28
        else if (layoutType === 'dark') iconSize = 32
        else if (layoutType === 'clean') iconSize = 30
        else if (layoutType === 'square') iconSize = 30
        return <IconComponent size={iconSize} />
      }
      // Se não encontrar, usar emoji como fallback
      return category.icon
    }
    // Ícone padrão se não houver ícone definido
    return '🍽️'
  }

  const displayCategories = isAllCategories ? categories : categories

  const renderCategoryCard = (category: CategoryData, isSelected = false, onClick?: () => void) => {
    const iconElement = getCategoryIcon(category)

    switch (layoutType) {
      case 'default':
        return (
          <S.CategoryCardDefault key={category.id} selected={isSelected} onClick={onClick}>
            <S.CircleIcon selected={isSelected} primaryColor={primaryColor}>
              {iconElement}
            </S.CircleIcon>
            <S.CircleLabel>{category.name}</S.CircleLabel>
          </S.CategoryCardDefault>
        )

      case 'dark':
        return (
          <S.CategoryCardDarkWrapper key={category.id}>
            <S.CategoryCardDark
              selected={isSelected}
              onClick={onClick}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            >
              <S.DarkIcon primaryColor={primaryColor} secondaryColor={secondaryColor}>
                {iconElement}
              </S.DarkIcon>
            </S.CategoryCardDark>
            <S.DarkLabel>{category.name}</S.DarkLabel>
          </S.CategoryCardDarkWrapper>
        )

      case 'clean':
        return (
          <S.CategoryCardClean
            key={category.id}
            selected={isSelected}
            onClick={onClick}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          >
            <S.OrangeIcon primaryColor={primaryColor} secondaryColor={secondaryColor}>
              {iconElement}
            </S.OrangeIcon>
            <S.OrangeLabel primaryColor={primaryColor} secondaryColor={secondaryColor}>
              {category.name}
            </S.OrangeLabel>
          </S.CategoryCardClean>
        )

      case 'square':
        return (
          <S.CategoryCardSquareWrapper key={category.id}>
            <S.CategoryCardSquare
              selected={isSelected}
              onClick={onClick}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            >
              <S.SquareIcon primaryColor={primaryColor} secondaryColor={secondaryColor}>
                {iconElement}
              </S.SquareIcon>
            </S.CategoryCardSquare>
            <S.SquareLabel>{category.name}</S.SquareLabel>
          </S.CategoryCardSquareWrapper>
        )

      default:
        return (
          <S.CategoryCard key={category.id} selected={isSelected} onClick={onClick}>
            <S.CategoryIcon style={{ fontSize: '20px' }}>{iconElement}</S.CategoryIcon>
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
  }

  // Modo 1: VIEW - Visualização normal (preview e clientes)
  if (mode === 'view') {
    if (!displayCategories.length) {
      return null
    }

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <S.CategoriesGrid
            ref={containerRef}
            layout={layoutType}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            isDragging={isDragging}
          >
            {displayCategories.map((category) => renderCategoryCard(category))}
          </S.CategoriesGrid>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Modo 2: PREVIEW-EDIT - Visualização no preview com controles de exclusão
  if (mode === 'preview-edit') {
    if (!displayCategories.length) {
      return (
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewTitle>
              <FolderIcon size={20} />
              <span>Categorias</span>
            </S.PreviewTitle>
            <div style={{ display: 'flex', gap: '4px' }}>
              {onEdit && (
                <Button variant="ghost" size="sm" onClick={onEdit}>
                  <PencilIcon size={16} />
                </Button>
              )}
              {onRemove && (
                <Button variant="ghost" size="sm" onClick={onRemove}>
                  <TrashIcon size={16} />
                </Button>
              )}
            </div>
          </S.PreviewHeader>
          <S.FallbackContainer>
            <S.FallbackContent>
              <FolderIcon size={48} />
              <span>Nenhuma categoria configurada</span>
            </S.FallbackContent>
          </S.FallbackContainer>
        </S.PreviewContainer>
      )
    }

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
              <div style={{ display: 'flex', gap: '4px' }}>
                {onEdit && (
                  <Button variant="ghost" size="sm" onClick={onEdit}>
                    <PencilIcon size={16} />
                  </Button>
                )}
                {onRemove && (
                  <Button variant="ghost" size="sm" onClick={onRemove}>
                    <TrashIcon size={16} />
                  </Button>
                )}
              </div>
            </S.PreviewHeader>
            <S.CategoriesGrid
              ref={containerRef}
              layout={layoutType}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              isDragging={isDragging}
            >
              {displayCategories.map((category) => renderCategoryCard(category))}
            </S.CategoriesGrid>
          </S.PreviewContainer>
        </motion.div>
      </AnimatePresence>
    )
  }

  // Modo 3: ADD - Interface para adicionar nova seção
  if (mode === 'add') {
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

          <S.ConfigSection>
            <S.ConfigTitle>Configuração de Exibição</S.ConfigTitle>
            <S.ConfigOptions>
              <S.ConfigOption
                active={tempIsAllCategories}
                onClick={() => {
                  setTempIsAllCategories(true)
                  setTempSelectedCategories([])
                  setTempSelectedCategoryIds([])
                }}
              >
                <span>Mostrar todas as categorias ativas</span>
                {tempIsAllCategories && <CheckIcon size={16} />}
              </S.ConfigOption>
              <S.ConfigOption active={!tempIsAllCategories} onClick={() => setTempIsAllCategories(false)}>
                <span>
                  Selecionar categorias específicas
                  {!tempIsAllCategories &&
                    tempSelectedCategories.length > 0 &&
                    ` (${tempSelectedCategories.length} selecionadas)`}
                </span>
                {!tempIsAllCategories && <CheckIcon size={16} />}
              </S.ConfigOption>
            </S.ConfigOptions>
          </S.ConfigSection>

          {!tempIsAllCategories && (
            <S.SelectionSection>
              <S.SelectionHeader>
                <h4>Selecionar Categorias</h4>
                <Combobox
                  placeholder="Buscar categorias..."
                  onSearch={handleCategorySearch}
                  onChange={handleCategorySelect}
                />
              </S.SelectionHeader>

              {tempSelectedCategories.length > 0 && (
                <S.SelectedCategoriesList>
                  {tempSelectedCategories.map((category) => (
                    <S.SelectedCategoryItem key={category.id}>
                      <span>{getCategoryIcon(category)}</span>
                      <span>{category.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleCategoryRemove(category.id)}>
                        <TrashIcon size={12} />
                      </Button>
                    </S.SelectedCategoryItem>
                  ))}
                </S.SelectedCategoriesList>
              )}
            </S.SelectionSection>
          )}

          {isLoading && (
            <S.LoadingContainer>
              <S.LoadingSpinner />
              <span>Carregando categorias...</span>
            </S.LoadingContainer>
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
            <Button
              variant="ghost"
              onClick={() => {
                console.log('Cancel button clicked (add mode)')
                _onClose?.()
              }}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                console.log('Add button clicked')
                handleAddSection()
              }}
              disabled={isLoading || (!tempIsAllCategories && tempSelectedCategoryIds.length === 0)}
            >
              {isLoading ? 'Adicionando...' : 'Adicionar Seção'}
            </Button>
          </div>
        </S.EditContent>
      </S.EditContainer>
    )
  }

  // Modo 4: EDIT - Visualização de edição (usada no SectionDialog)
  if (mode === 'edit') {
    return (
      <S.EditContainer>
        <S.EditHeader>
          <S.EditTitle>
            <FolderIcon size={20} />
            <span>Categorias</span>
          </S.EditTitle>
        </S.EditHeader>

        <S.EditContent>
          <S.ConfigSection>
            <S.ConfigTitle>Configuração de Exibição</S.ConfigTitle>
            <S.ConfigOptions>
              <S.ConfigOption
                active={tempIsAllCategories}
                onClick={() => {
                  setTempIsAllCategories(true)
                  setTempSelectedCategories([])
                  setTempSelectedCategoryIds([])
                }}
              >
                <span>Mostrar todas as categorias ativas</span>
                {tempIsAllCategories && <CheckIcon size={16} />}
              </S.ConfigOption>
              <S.ConfigOption active={!tempIsAllCategories} onClick={() => setTempIsAllCategories(false)}>
                <span>
                  Selecionar categorias específicas
                  {!tempIsAllCategories &&
                    tempSelectedCategories.length > 0 &&
                    ` (${tempSelectedCategories.length} selecionadas)`}
                </span>
                {!tempIsAllCategories && <CheckIcon size={16} />}
              </S.ConfigOption>
            </S.ConfigOptions>
          </S.ConfigSection>

          {!tempIsAllCategories && (
            <S.SelectionSection>
              <S.SelectionHeader>
                <h4>Selecionar Categorias</h4>
                <Combobox
                  placeholder="Buscar categorias..."
                  onSearch={handleCategorySearch}
                  onChange={handleCategorySelect}
                />
              </S.SelectionHeader>

              {tempSelectedCategories.length > 0 && (
                <S.SelectedCategoriesList>
                  {tempSelectedCategories.map((category) => (
                    <S.SelectedCategoryItem key={category.id}>
                      <span>{getCategoryIcon(category)}</span>
                      <span>{category.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleCategoryRemove(category.id)}>
                        <TrashIcon size={12} />
                      </Button>
                    </S.SelectedCategoryItem>
                  ))}
                </S.SelectedCategoriesList>
              )}
            </S.SelectionSection>
          )}

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button
              variant="ghost"
              onClick={() => {
                console.log('Cancel button clicked (edit mode)')
                _onClose?.()
              }}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                console.log('Save button clicked')
                handleSaveChanges()
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>

          {isLoading && (
            <S.LoadingContainer>
              <S.LoadingSpinner />
              <span>Carregando categorias...</span>
            </S.LoadingContainer>
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
        </S.EditContent>
      </S.EditContainer>
    )
  }

  return null
}
