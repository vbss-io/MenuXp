import { FolderIcon, FunnelIcon, MagnifyingGlassIcon, PlusIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Input } from '@vbss-ui/input'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetCategoriesUsecase } from '@/application/categories/get-categories.usecase'
import type { Category } from '@/domain/models/category.model'
import { CategoryCard } from '@/presentation/components/entities/categories/category-card'
import { Filters, type CategoryFilters } from '@/presentation/components/entities/categories/category-filters'
import { CategoryModal } from '@/presentation/components/entities/categories/category-modal'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@/presentation/components/ui/loading'
import { Pagination } from '@/presentation/components/ui/pagination'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDebounce } from '@/presentation/hooks/use-debounce'

import * as S from './styles'

export const CategoriesPage = () => {
  const { restaurantId } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | undefined>()
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [filters, setFilters] = useState<CategoryFilters>({
    searchMask: '',
    includeInactive: false,
    sortField: 'name',
    sortOrder: 'asc',
    rowsPerPage: 20
  })

  const debouncedSearchMask = useDebounce(filters.searchMask, 500)

  const loadCategories = async (page = currentPage) => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const getCategoriesUsecase = new GetCategoriesUsecase()
      const categoriesData = await getCategoriesUsecase.execute({
        restaurantId,
        searchMask: debouncedSearchMask,
        includeInactive: filters.includeInactive,
        sortField: filters.sortField,
        sortOrder: filters.sortOrder,
        rowsPerPage: filters.rowsPerPage,
        page
      })
      setCategories(categoriesData)
      setTotalItems(categoriesData.length)
    } catch (error) {
      toast.error('Erro ao carregar categorias')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (restaurantId) {
      loadCategories(1)
      setCurrentPage(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    restaurantId,
    debouncedSearchMask,
    filters.includeInactive,
    filters.sortField,
    filters.sortOrder,
    filters.rowsPerPage
  ])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    loadCategories(page)
  }

  const handleCreateCategory = () => {
    setEditingCategory(undefined)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
  }

  const handleModalSuccess = () => {
    loadCategories()
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
      <Breadcrumb lastPath="Categorias" />
      <S.Header>
        <S.Title>Categorias</S.Title>
        <S.Subtitle>Gerencie as categorias do seu restaurante</S.Subtitle>
      </S.Header>
      <S.ActionsRow>
        <Input
          placeholder="Buscar categorias..."
          value={filters.searchMask}
          onChange={(e) => setFilters((prev) => ({ ...prev, searchMask: e.target.value }))}
          fontSize="sm"
          icon={<MagnifyingGlassIcon size={16} />}
        />
        <Button
          variant="outline"
          size="md"
          onClick={() => setIsFiltersExpanded((prev) => !prev)}
          icon={<FunnelIcon size={18} />}
        >
          Mais Opções
        </Button>
        <Button variant="primary" onClick={handleCreateCategory} size="md">
          <PlusIcon size={16} />
          Nova Categoria
        </Button>
      </S.ActionsRow>
      <Filters
        filters={filters}
        onFiltersChange={setFilters}
        onReset={() =>
          setFilters({
            searchMask: '',
            includeInactive: false,
            sortField: 'name',
            sortOrder: 'asc',
            rowsPerPage: 20
          })
        }
        isExpanded={isFiltersExpanded}
      />
      {isLoading ? (
        <S.Container>
          <S.LoadingWrapper>
            <Loading />
          </S.LoadingWrapper>
        </S.Container>
      ) : (
        <>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {categories.length > 0 ? (
              <S.CategoriesGrid>
                <AnimatePresence>
                  {categories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      onEdit={handleEditCategory}
                      onDelete={handleDeleteCategory}
                      onRefresh={loadCategories}
                    />
                  ))}
                </AnimatePresence>
              </S.CategoriesGrid>
            ) : (
              <S.EmptyState>
                <S.EmptyStateIcon>
                  <FolderIcon size={48} />
                </S.EmptyStateIcon>
                <S.EmptyStateTitle>
                  {filters.searchMask ? 'Nenhuma categoria encontrada' : 'Nenhuma categoria criada'}
                </S.EmptyStateTitle>
                <S.EmptyStateText>
                  {filters.searchMask
                    ? 'Tente ajustar os termos de busca'
                    : 'Crie sua primeira categoria para organizar os produtos do seu restaurante'}
                </S.EmptyStateText>
                {!filters.searchMask && (
                  <Button variant="primary" onClick={handleCreateCategory} size="md" style={{ marginTop: '16px' }}>
                    <PlusIcon size={16} />
                    Criar Primeira Categoria
                  </Button>
                )}
              </S.EmptyState>
            )}
          </motion.div>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={filters.rowsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
        onSuccess={handleModalSuccess}
      />
    </S.Container>
  )
}
