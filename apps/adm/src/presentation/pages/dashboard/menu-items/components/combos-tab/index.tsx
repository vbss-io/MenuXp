import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { GetCombosUsecase } from '@/application/combos/get-combos.usecase'
import type { Combo } from '@/domain/models/combo.model'
import { MagnifyingGlassIcon, PackageIcon, PlusIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { ComboCard } from '@/presentation/components/entities/combos/combo-card'
import {
  ComboFilters,
  type ComboFilters as ComboFiltersType
} from '@/presentation/components/entities/combos/combo-filters'
import { ComboModal } from '@/presentation/components/entities/combos/combo-modal'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDebounce } from '@/presentation/hooks/use-debounce'
import { Button, Combobox, FormInput, Loading, Pagination, type ComboboxOption } from '@menuxp/ui'

import * as Page from '../../../styles'
import * as S from '../styles'
interface CombosTabProps {
  currentPage: number
  onPageChange: (page: number) => void
}

export const CombosTab = ({ currentPage, onPageChange }: CombosTabProps) => {
  const { restaurantId } = useAuth()
  const [combos, setCombos] = useState<Combo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isComboModalOpen, setIsComboModalOpen] = useState(false)
  const [editingCombo, setEditingCombo] = useState<Combo | undefined>()
  const [totalCombos, setTotalCombos] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const [filters, setFilters] = useState<ComboFiltersType>({
    searchMask: '',
    includeInactive: false,
    categoryId: undefined,
    sortField: 'name',
    sortOrder: 'asc'
  })

  const debouncedSearchMask = useDebounce(filters.searchMask, 500)

  const loadCombos = async (page = currentPage) => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const getCombosUsecase = new GetCombosUsecase()
      const { combos: combosData, total } = await getCombosUsecase.execute({
        restaurantId,
        searchMask: debouncedSearchMask,
        categoryId: filters.categoryId,
        page,
        rowsPerPage: 20,
        includeInactive: filters.includeInactive
      })
      setCombos(combosData)
      setTotalCombos(total)
    } catch (error) {
      toast.error('Erro ao carregar combos')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (restaurantId) {
      loadCombos(1)
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

  const handleComboModalSuccess = () => {
    loadCombos()
  }

  const hasCombos = combos.length > 0

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
          <Page.SearchLabel htmlFor="search">Buscar combos</Page.SearchLabel>
          <FormInput
            id="search"
            label=""
            placeholder="Digite para buscar..."
            value={filters.searchMask}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters((prev) => ({ ...prev, searchMask: e.target.value }))
            }
            leftIcon={<MagnifyingGlassIcon size={16} />}
            aria-label="Buscar combos"
          />
        </Page.SearchWrapper>
        <Combobox
          placeholder="Filtrar por categoria"
          value={selectedCategory}
          onChange={handleCategoryChange}
          onSearch={handleCategorySearch}
          aria-label="Filtrar combos por categoria"
        />
        <Page.ActionsRowButtons>
          <ComboFilters
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
            isEmpty={!hasCombos}
          />
          {hasCombos ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsComboModalOpen(true)}
              leftIcon={<PlusIcon size={16} />}
              aria-label="Criar novo combo"
            >
              Novo Combo
            </Button>
          ) : (
            <Button
              variant="white"
              size="sm"
              onClick={() => setIsComboModalOpen(true)}
              leftIcon={<PlusIcon size={16} />}
              aria-label="Criar novo combo"
            >
              Novo Combo
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
            {combos.length > 0 ? (
              <S.CombosGrid>
                <AnimatePresence>
                  {combos.map((combo) => (
                    <ComboCard
                      key={combo.id}
                      combo={combo}
                      onEdit={(combo) => {
                        setEditingCombo(combo)
                        setIsComboModalOpen(true)
                      }}
                      onDelete={(comboId) => {
                        setCombos((prev) => prev.filter((c) => c.id !== comboId))
                      }}
                      onRefresh={loadCombos}
                    />
                  ))}
                </AnimatePresence>
              </S.CombosGrid>
            ) : (
              <Page.EmptyState>
                {filters.searchMask ? (
                  <>
                    <Page.EmptyStateIcon>
                      <MagnifyingGlassIcon size={72} />
                    </Page.EmptyStateIcon>
                    <Page.EmptyStateTitle>Nenhum combo encontrado</Page.EmptyStateTitle>
                    <Page.EmptyStateDescription>
                      Nenhum combo corresponde à busca "{filters.searchMask}"
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
                      <PackageIcon size={72} />
                    </Page.EmptyStateIcon>
                    <Page.EmptyStateTitle>Nenhum combo ainda</Page.EmptyStateTitle>
                    <Page.EmptyStateDescription>
                      Combos permitem agrupar itens com preço especial.
                    </Page.EmptyStateDescription>
                    <Page.EmptyStateChecklist>
                      <Page.ChecklistItem>✅ Ex.: Combo Executivo, Combo Família</Page.ChecklistItem>
                      <Page.ChecklistItem>✅ Defina descontos atrativos</Page.ChecklistItem>
                    </Page.EmptyStateChecklist>
                    <Page.EmptyStateButton>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setIsComboModalOpen(true)}
                        leftIcon={<PlusIcon size={16} />}
                        aria-label="Criar novo combo"
                      >
                        Novo Combo
                      </Button>
                    </Page.EmptyStateButton>
                  </>
                )}
              </Page.EmptyState>
            )}
          </motion.div>
          <Pagination
            currentPage={currentPage}
            totalItems={totalCombos}
            itemsPerPage={20}
            onPageChange={onPageChange}
          />
        </>
      )}
      <ComboModal
        isOpen={isComboModalOpen}
        onClose={() => setIsComboModalOpen(false)}
        combo={editingCombo}
        onSuccess={handleComboModalSuccess}
      />
    </Page.TabContainer>
  )
}
