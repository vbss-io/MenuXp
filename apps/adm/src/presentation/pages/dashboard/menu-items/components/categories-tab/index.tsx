import { Button, FormInput, Loading, Pagination } from '@menuxp/ui'
import { FolderIcon, MagnifyingGlassIcon, PlusIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetCategoriesUsecase } from '@/application/categories/get-categories.usecase'
import type { Category } from '@/domain/models/category.model'
import { CategoryCard } from '@/presentation/components/entities/categories/category-card'
import { Filters, type CategoryFilters } from '@/presentation/components/entities/categories/category-filters'
import { CategoryModal } from '@/presentation/components/entities/categories/category-modal'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDebounce } from '@/presentation/hooks/use-debounce'

import * as Page from '../../../styles'
import * as S from '../styles'

interface CategoriesTabProps {
  currentPage: number
  onPageChange: (page: number) => void
}

export const CategoriesTab = ({ currentPage, onPageChange }: CategoriesTabProps) => {
  const { restaurantId } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | undefined>()
  const [parentCategoryId, setParentCategoryId] = useState<string | undefined>()
  const [totalItems, setTotalItems] = useState(0)

  const [filters, setFilters] = useState<CategoryFilters>({
    searchMask: '',
    includeInactive: false,
    sortField: 'name',
    sortOrder: 'asc'
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
      onPageChange(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, debouncedSearchMask, filters.includeInactive, filters.sortField, filters.sortOrder])

  const handleCreateCategory = () => {
    setEditingCategory(undefined)
    setParentCategoryId(undefined)
    setIsModalOpen(true)
  }

  const handleCreateSubCategory = (parentCategoryId: string) => {
    setEditingCategory(undefined)
    setParentCategoryId(parentCategoryId)
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

  const hasCategories = categories.length > 0

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
          <Page.SearchLabel htmlFor="search">Buscar categorias</Page.SearchLabel>
          <FormInput
            id="search"
            label=""
            placeholder="Digite para buscar..."
            value={filters.searchMask}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters((prev) => ({ ...prev, searchMask: e.target.value }))
            }
            leftIcon={<MagnifyingGlassIcon size={16} />}
            aria-label="Buscar categorias"
          />
        </Page.SearchWrapper>
        <Page.ActionsRowButtons>
          <Filters
            filters={filters}
            onFiltersChange={setFilters}
            onReset={() =>
              setFilters({
                searchMask: '',
                includeInactive: false,
                sortField: 'name',
                sortOrder: 'asc'
              })
            }
            isEmpty={!hasCategories}
          />
          {hasCategories ? (
            <Button
              variant="primary"
              onClick={handleCreateCategory}
              size="sm"
              leftIcon={<PlusIcon size={16} />}
              aria-label="Criar nova categoria"
            >
              Nova Categoria
            </Button>
          ) : (
            <Button
              variant="white"
              onClick={handleCreateCategory}
              size="sm"
              leftIcon={<PlusIcon size={16} />}
              aria-label="Criar nova categoria"
            >
              Nova Categoria
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
                      onCreateSubCategory={handleCreateSubCategory}
                    />
                  ))}
                </AnimatePresence>
              </S.CategoriesGrid>
            ) : (
              <Page.EmptyState>
                {filters.searchMask ? (
                  <>
                    <Page.EmptyStateIcon>
                      <MagnifyingGlassIcon size={72} />
                    </Page.EmptyStateIcon>
                    <Page.EmptyStateTitle>Nenhuma categoria encontrada</Page.EmptyStateTitle>
                    <Page.EmptyStateDescription>
                      Nenhuma categoria corresponde à busca "{filters.searchMask}"
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
                      <FolderIcon size={72} />
                    </Page.EmptyStateIcon>
                    <Page.EmptyStateTitle>Nenhuma categoria ainda</Page.EmptyStateTitle>
                    <Page.EmptyStateDescription>
                      Categorias organizam seu cardápio. Crie ao menos uma para cadastrar itens e combos.
                    </Page.EmptyStateDescription>
                    <Page.EmptyStateChecklist>
                      <Page.ChecklistItem>✅ Ex.: Lanches, Bebidas, Sobremesas</Page.ChecklistItem>
                      <Page.ChecklistItem>✅ Você pode reordenar depois</Page.ChecklistItem>
                    </Page.EmptyStateChecklist>
                    <Page.EmptyStateButton>
                      <Button
                        variant="primary"
                        onClick={handleCreateCategory}
                        size="sm"
                        leftIcon={<PlusIcon size={16} />}
                        aria-label="Criar nova categoria"
                      >
                        Nova Categoria
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
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
        parentCategoryId={parentCategoryId}
        onSuccess={handleModalSuccess}
      />
    </Page.TabContainer>
  )
}
