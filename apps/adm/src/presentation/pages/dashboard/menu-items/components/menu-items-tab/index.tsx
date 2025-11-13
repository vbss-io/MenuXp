import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { GetMenuItemsUsecase } from '@/application/menu-items/get-menu-items.usecase'
import type { MenuItem } from '@/domain/models/menu-item.model'
import { MenuItemCard } from '@/presentation/components/entities/menu-items/menu-item-card'
import {
  MenuItemFilters,
  type MenuItemFilters as MenuItemFiltersType
} from '@/presentation/components/entities/menu-items/menu-item-filters'
import { MenuItemModal } from '@/presentation/components/entities/menu-items/menu-item-modal'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDebounce } from '@/presentation/hooks/use-debounce'
import { Button, Combobox, FormInput, Loading, Pagination, type ComboboxOption } from '@menuxp/ui'
import { BowlFoodIcon, MagnifyingGlassIcon, PlusIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import * as Page from '../../../styles'
import * as S from '../styles'
interface MenuItemsTabProps {
  currentPage: number
  onPageChange: (page: number) => void
}

export const MenuItemsTab = ({ currentPage, onPageChange }: MenuItemsTabProps) => {
  const { restaurantId } = useAuth()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | undefined>()
  const [totalItems, setTotalItems] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const [filters, setFilters] = useState<MenuItemFiltersType>({
    searchMask: '',
    includeInactive: false,
    categoryId: undefined,
    sortField: 'name',
    sortOrder: 'asc'
  })

  const debouncedSearchMask = useDebounce(filters.searchMask, 500)

  const loadMenuItems = async (page = currentPage) => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const getMenuItemsUsecase = new GetMenuItemsUsecase()
      const { menuItems: menuItemsData, total } = await getMenuItemsUsecase.execute({
        restaurantId,
        searchMask: debouncedSearchMask,
        includeInactive: filters.includeInactive,
        categoryId: filters.categoryId,
        page,
        sortField: filters.sortField as 'name' | 'createdAt' | 'updatedAt',
        sortOrder: filters.sortOrder
      })
      setMenuItems(menuItemsData)
      setTotalItems(total)
    } catch (error) {
      toast.error('Erro ao carregar itens do menu')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (restaurantId) {
      loadMenuItems(1)
      onPageChange(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    restaurantId,
    debouncedSearchMask,
    filters.includeInactive,
    filters.categoryId,
    filters.sortField,
    filters.sortOrder
  ])

  useEffect(() => {
    setSelectedCategory(filters.categoryId || '')
  }, [filters.categoryId])

  const handleCreateMenuItem = () => {
    setEditingMenuItem(undefined)
    setIsModalOpen(true)
  }

  const handleEditMenuItem = (menuItem: MenuItem) => {
    setEditingMenuItem(menuItem)
    setIsModalOpen(true)
  }

  const handleDeleteMenuItem = (menuItemId: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== menuItemId))
  }

  const handleModalSuccess = () => {
    loadMenuItems()
  }

  const hasMenuItems = menuItems.length > 0

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setFilters((prev) => ({ ...prev, categoryId: value || undefined }))
  }

  const handleCategorySearch = async (searchTerm: string): Promise<ComboboxOption[]> => {
    try {
      const getCategoriesNamesUsecase = new GetCategoriesNamesUsecase()
      const categoriesData = await getCategoriesNamesUsecase.execute({
        restaurantId: restaurantId!,
        searchMask: searchTerm,
        removeSubCategories: false
      })
      return categoriesData.map((cat) => ({
        label: cat.name,
        value: cat.id,
        displayLabel: cat.mainCategoryName ? `${cat.mainCategoryName} → ${cat.name}` : cat.name,
        icon: cat.icon
      }))
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <Page.TabContainer>
      <Page.ActionsRow>
        <Page.SearchWrapper>
          <Page.SearchLabel htmlFor="search">Buscar itens</Page.SearchLabel>
          <FormInput
            id="search"
            label=""
            placeholder="Digite para buscar..."
            value={filters.searchMask}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters((prev) => ({ ...prev, searchMask: e.target.value }))
            }
            leftIcon={<MagnifyingGlassIcon size={16} />}
            aria-label="Buscar itens do menu"
          />
        </Page.SearchWrapper>
        <Combobox
          placeholder="Filtrar por categoria"
          value={selectedCategory}
          onChange={handleCategoryChange}
          onSearch={handleCategorySearch}
          aria-label="Filtrar itens por categoria"
        />
        <Page.ActionsRowButtons>
          <MenuItemFilters
            filters={filters}
            onFiltersChange={setFilters}
            onReset={() =>
              setFilters({
                searchMask: '',
                includeInactive: false,
                categoryId: undefined,
                sortField: 'name',
                sortOrder: 'asc'
              })
            }
            isEmpty={!hasMenuItems}
          />
          {hasMenuItems ? (
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateMenuItem}
              leftIcon={<PlusIcon size={16} />}
              aria-label="Criar novo item do menu"
            >
              Novo Item
            </Button>
          ) : (
            <Button
              variant="white"
              size="sm"
              onClick={handleCreateMenuItem}
              leftIcon={<PlusIcon size={16} />}
              aria-label="Criar novo item do menu"
            >
              Novo Item
            </Button>
          )}
        </Page.ActionsRowButtons>
      </Page.ActionsRow>
      {isLoading ? (
        <Page.LoadingWrapper>
          <Loading />
        </Page.LoadingWrapper>
      ) : (
        <>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {menuItems.length > 0 ? (
              <S.MenuItemsGrid>
                <AnimatePresence>
                  {menuItems.map((menuItem) => (
                    <MenuItemCard
                      key={menuItem.id}
                      menuItem={menuItem}
                      onEdit={handleEditMenuItem}
                      onDelete={handleDeleteMenuItem}
                      onRefresh={loadMenuItems}
                    />
                  ))}
                </AnimatePresence>
              </S.MenuItemsGrid>
            ) : (
              <Page.EmptyState>
                {filters.searchMask ? (
                  <>
                    <Page.EmptyStateIcon>
                      <MagnifyingGlassIcon size={72} />
                    </Page.EmptyStateIcon>
                    <Page.EmptyStateTitle>Nenhum item encontrado</Page.EmptyStateTitle>
                    <Page.EmptyStateDescription>
                      Nenhum item corresponde à busca "{filters.searchMask}"
                    </Page.EmptyStateDescription>
                    <Button
                      variant="white"
                      size="sm"
                      onClick={() => setFilters((prev) => ({ ...prev, searchMask: '' }))}
                      style={{ marginTop: '16px' }}
                    >
                      Limpar busca
                    </Button>
                  </>
                ) : (
                  <>
                    <Page.EmptyStateIcon>
                      <BowlFoodIcon size={72} />
                    </Page.EmptyStateIcon>
                    <Page.EmptyStateTitle>Nenhum item ainda</Page.EmptyStateTitle>
                    <Page.EmptyStateDescription>
                      Itens são os produtos do seu cardápio vinculados a categorias.
                    </Page.EmptyStateDescription>
                    <Page.EmptyStateChecklist>
                      <Page.ChecklistItem>✅ Ex.: Hambúrguer Especial, Suco de Laranja</Page.ChecklistItem>
                      <Page.ChecklistItem>✅ Adicione fotos e descrições</Page.ChecklistItem>
                    </Page.EmptyStateChecklist>
                    <Page.EmptyStateButton>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleCreateMenuItem}
                        leftIcon={<PlusIcon size={16} />}
                        aria-label="Criar novo item do menu"
                      >
                        Novo Item
                      </Button>
                    </Page.EmptyStateButton>
                  </>
                )}
              </Page.EmptyState>
            )}
          </motion.div>
          <Pagination currentPage={currentPage} totalItems={totalItems} itemsPerPage={20} onPageChange={onPageChange} />
        </>
      )}
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menuItem={editingMenuItem}
        onSuccess={handleModalSuccess}
      />
    </Page.TabContainer>
  )
}
