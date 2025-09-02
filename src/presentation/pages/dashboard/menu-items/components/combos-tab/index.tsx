import { PackageIcon, PlusIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GetCategoriesNamesUsecase } from '@/application/categories/get-categories-names.usecase'
import { GetCombosUsecase } from '@/application/combos/get-combos.usecase'
import type { Combo } from '@/domain/models/combo.model'

import { ComboCard } from '@/presentation/components/entities/combos/combo-card'
import {
  ComboFilters,
  type ComboFilters as ComboFiltersType
} from '@/presentation/components/entities/combos/combo-filters'
import { ComboModal } from '@/presentation/components/entities/combos/combo-modal'
import { Button } from '@/presentation/components/ui/button'
import { Combobox, type ComboboxOption } from '@/presentation/components/ui/combobox'
import { Loading } from '@/presentation/components/ui/loading'
import { Pagination } from '@/presentation/components/ui/pagination'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from '../../styles'

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

  const loadCombos = async (page = currentPage) => {
    if (!restaurantId) return
    setIsLoading(true)
    try {
      const getCombosUsecase = new GetCombosUsecase()
      const { combos: combosData, total } = await getCombosUsecase.execute({
        restaurantId,
        categoryId: filters.categoryId,
        page,
        rowsPerPage: 20,
        isActive: !filters.includeInactive
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
  }, [restaurantId, filters.includeInactive, filters.categoryId, filters.sortField, filters.sortOrder])

  useEffect(() => {
    setSelectedCategory(filters.categoryId || '')
  }, [filters.categoryId])

  const handleComboModalSuccess = () => {
    loadCombos()
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
    <S.TabContainer>
      <S.ActionsRow>
        <Combobox
          placeholder="Filtrar por categoria"
          value={selectedCategory}
          onChange={handleCategoryChange}
          onSearch={handleCategorySearch}
        />
        <S.ActionsRowButtons>
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
          />
          <Button variant="primary" onClick={() => setIsComboModalOpen(true)} leftIcon={<PlusIcon size={16} />}>
            Novo Combo
          </Button>
        </S.ActionsRowButtons>
      </S.ActionsRow>
      {isLoading ? (
        <S.LoadingWrapper>
          <Loading />
        </S.LoadingWrapper>
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
              <S.EmptyState>
                <S.EmptyStateIcon>
                  <PackageIcon size={48} />
                </S.EmptyStateIcon>
                <S.EmptyStateTitle>Nenhum combo criado</S.EmptyStateTitle>
                <S.EmptyStateText>Crie seu primeiro combo para o menu do seu restaurante</S.EmptyStateText>
                <Button
                  variant="primary"
                  onClick={() => setIsComboModalOpen(true)}
                  leftIcon={<PlusIcon size={16} />}
                  style={{ marginTop: '16px' }}
                >
                  Criar Primeiro Combo
                </Button>
              </S.EmptyState>
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
    </S.TabContainer>
  )
}
