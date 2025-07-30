import { SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Checkbox } from '@vbss-ui/checkbox'

import * as S from './styles'

export interface MenuItemFilters {
  searchMask: string
  includeInactive: boolean
  categoryId?: string
  sortField: 'name' | 'price' | 'createdAt' | 'updatedAt'
  sortOrder: 'asc' | 'desc'
  rowsPerPage: number
}

interface FiltersProps {
  filters: MenuItemFilters
  onFiltersChange: (filters: MenuItemFilters) => void
  onReset: () => void
  isExpanded: boolean
}

const sortFieldOptions = [
  { value: 'name', label: 'Nome' },
  { value: 'price', label: 'Preço' },
  { value: 'createdAt', label: 'Data de Criação' },
  { value: 'updatedAt', label: 'Data de Atualização' }
]

const rowsPerPageOptions = [
  { value: 10, label: '10 por página' },
  { value: 20, label: '20 por página' },
  { value: 50, label: '50 por página' },
  { value: 100, label: '100 por página' }
]

export const MenuItemFilters = ({ filters, onFiltersChange, onReset, isExpanded }: FiltersProps) => {
  const handleFilterChange = (key: keyof MenuItemFilters, value: string | number | boolean | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  if (!isExpanded) return null

  return (
    <S.FiltersContainer>
      <S.FiltersContent>
        <S.FilterRow>
          <S.FilterGroup>
            <S.FilterLabel>Ordenar por</S.FilterLabel>
            <S.Select
              value={filters.sortField}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange('sortField', e.target.value)}
            >
              {sortFieldOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </S.Select>
          </S.FilterGroup>
          <S.FilterGroup>
            <S.FilterLabel>Ordem</S.FilterLabel>
            <S.SortOrderContainer>
              <Button
                variant={filters.sortOrder === 'asc' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleFilterChange('sortOrder', 'asc')}
                icon={<SortAscendingIcon size={16} />}
              >
                Crescente
              </Button>
              <Button
                variant={filters.sortOrder === 'desc' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleFilterChange('sortOrder', 'desc')}
                icon={<SortDescendingIcon size={16} />}
              >
                Decrescente
              </Button>
            </S.SortOrderContainer>
          </S.FilterGroup>
          <S.FilterGroup>
            <S.FilterLabel>Itens por página</S.FilterLabel>
            <S.Select
              value={filters.rowsPerPage}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange('rowsPerPage', Number(e.target.value))
              }
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </S.Select>
          </S.FilterGroup>
        </S.FilterRow>
        <S.FilterRow>
          <S.FilterGroup>
            <Checkbox
              checked={filters.includeInactive}
              onCheckedChange={(checked) => handleFilterChange('includeInactive', checked)}
              label="Incluir itens inativos"
            />
          </S.FilterGroup>
        </S.FilterRow>
        <Button variant="outline" size="sm" onClick={onReset} style={{ alignSelf: 'flex-end' }}>
          Limpar
        </Button>
      </S.FiltersContent>
    </S.FiltersContainer>
  )
}
