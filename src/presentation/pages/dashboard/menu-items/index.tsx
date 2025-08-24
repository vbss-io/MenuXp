import { BowlFoodIcon, MagnifyingGlassIcon, PlusIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { GetMenuItemsUsecase } from '@/application/menu-items/get-menu-items.usecase'
import type { MenuItem } from '@/domain/models/menu-item.model'

import { MenuItemCard } from '@/presentation/components/entities/menu-items/menu-item-card'
import {
  MenuItemFilters,
  type MenuItemFilters as MenuItemFiltersType
} from '@/presentation/components/entities/menu-items/menu-item-filters'
import { MenuItemModal } from '@/presentation/components/entities/menu-items/menu-item-modal'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Button } from '@/presentation/components/ui/button'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { FormInput } from '@/presentation/components/ui/form-input'
import { Loading } from '@/presentation/components/ui/loading'
import { Pagination } from '@/presentation/components/ui/pagination'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDebounce } from '@/presentation/hooks/use-debounce'

import * as S from './styles'

export const MenuItemsPage = () => {
  const { restaurantId } = useAuth()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
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
      setCurrentPage(1)
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    loadMenuItems(page)
  }

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
    <S.Container>
      <Breadcrumb lastPath="Itens do Menu" />
      <S.Header>
        <S.Title>Itens do Menu</S.Title>
        <S.Subtitle>Gerencie os itens do menu do seu restaurante</S.Subtitle>
      </S.Header>
      <S.Content>
        <S.ActionsRow>
          <FormInput
            id="search"
            label=""
            placeholder="Buscar itens..."
            value={filters.searchMask}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters((prev) => ({ ...prev, searchMask: e.target.value }))
            }
            leftIcon={<MagnifyingGlassIcon size={16} />}
          />
          <Combobox
            placeholder="Filtrar por categoria"
            value={selectedCategory}
            onChange={handleCategoryChange}
            onSearch={handleCategorySearch}
          />
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
          />
          <Button variant="primary" onClick={handleCreateMenuItem} leftIcon={<PlusIcon size={16} />}>
            Novo Item
          </Button>
        </S.ActionsRow>
        {isLoading ? (
          <S.LoadingWrapper>
            <Loading />
          </S.LoadingWrapper>
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
                <S.EmptyState>
                  <S.EmptyStateIcon>
                    <BowlFoodIcon size={48} />
                  </S.EmptyStateIcon>
                  <S.EmptyStateTitle>
                    {filters.searchMask ? 'Nenhum item encontrado' : 'Nenhum item criado'}
                  </S.EmptyStateTitle>
                  <S.EmptyStateText>
                    {filters.searchMask
                      ? 'Tente ajustar os termos de busca'
                      : 'Crie seu primeiro item para o menu do seu restaurante'}
                  </S.EmptyStateText>
                  {!filters.searchMask && (
                    <Button
                      variant="primary"
                      onClick={handleCreateMenuItem}
                      leftIcon={<PlusIcon size={16} />}
                      style={{ marginTop: '16px' }}
                    >
                      Criar Primeiro Item
                    </Button>
                  )}
                </S.EmptyState>
              )}
            </motion.div>
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={20}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </S.Content>
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menuItem={editingMenuItem}
        onSuccess={handleModalSuccess}
      />
    </S.Container>
  )
}
