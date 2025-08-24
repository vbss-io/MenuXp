import { FunnelSimpleIcon, SortAscendingIcon } from '@phosphor-icons/react'

import { Button } from '@/presentation/components/ui/button'
import { FormCheckbox } from '@/presentation/components/ui/form-checkbox'
import { Popover } from '@/presentation/components/ui/popover'

import * as S from './styles'

export interface CategoryFilters {
  searchMask: string
  includeInactive: boolean
  sortField: 'name' | 'createdAt' | 'updatedAt'
  sortOrder: 'asc' | 'desc'
}

interface FiltersProps {
  filters: CategoryFilters
  onFiltersChange: (filters: CategoryFilters) => void
  onReset: () => void
}

const sortFieldOptions = [
  { value: 'name', label: 'Nome' },
  { value: 'createdAt', label: 'Criação' },
  { value: 'updatedAt', label: 'Atualização' }
]

export const Filters = ({ filters, onFiltersChange, onReset }: FiltersProps) => {
  const handleFilterChange = (key: keyof CategoryFilters, value: string | boolean) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  return (
    <S.FilterContainer>
      <S.SearchContainer>
        <Popover
          variant="outline"
          side="left"
          trigger={
            <Button variant="outline" size="md" as="div" leftIcon={<SortAscendingIcon size={20} weight="bold" />}>
              Ordenar
            </Button>
          }
        >
          <S.PopoverContent>
            <S.PopoverTitle>Ordenar por:</S.PopoverTitle>
            <S.PopoverOptions>
              {sortFieldOptions.map((option) => (
                <S.PopoverOption
                  key={option.value}
                  onClick={() => {
                    if (filters.sortField === option.value) {
                      const newSortOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc'
                      onFiltersChange({
                        ...filters,
                        sortOrder: newSortOrder
                      })
                    } else {
                      onFiltersChange({
                        ...filters,
                        sortField: option.value as 'name' | 'createdAt' | 'updatedAt',
                        sortOrder: 'asc'
                      })
                    }
                  }}
                  active={filters.sortField === option.value}
                >
                  {option.label}
                  {filters.sortField === option.value && (
                    <SortAscendingIcon
                      size={16}
                      weight="bold"
                      style={{ transform: `rotate(${filters.sortOrder === 'asc' ? '0' : '180'}deg)` }}
                    />
                  )}
                </S.PopoverOption>
              ))}
            </S.PopoverOptions>
          </S.PopoverContent>
        </Popover>
        <Popover
          variant="outline"
          side="left"
          trigger={
            <Button variant="outline" size="md" as="div" leftIcon={<FunnelSimpleIcon size={20} weight="bold" />}>
              Filtros
            </Button>
          }
        >
          <S.PopoverContent>
            <S.PopoverTitle>Filtros adicionais:</S.PopoverTitle>
            <S.PopoverOptions>
              <S.PopoverOption>
                <FormCheckbox
                  id="includeInactive"
                  label="Incluir categorias inativas"
                  checked={filters.includeInactive}
                  onCheckedChange={(checked) => handleFilterChange('includeInactive', checked)}
                  fontSize="sm"
                />
              </S.PopoverOption>
            </S.PopoverOptions>
            <Button variant="outline" size="sm" onClick={onReset} style={{ marginTop: '1rem', width: '100%' }}>
              Limpar
            </Button>
          </S.PopoverContent>
        </Popover>
      </S.SearchContainer>
    </S.FilterContainer>
  )
}
