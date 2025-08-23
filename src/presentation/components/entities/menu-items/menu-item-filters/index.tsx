import { FunnelSimpleIcon, SortAscendingIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Popover } from '@vbss-ui/popover'

import { FormCheckbox } from '@/presentation/components/ui/form-checkbox'

import * as S from './styles'

export interface MenuItemFilters {
  searchMask: string
  includeInactive: boolean
  categoryId?: string
  sortField: 'name' | 'price' | 'createdAt' | 'updatedAt'
  sortOrder: 'asc' | 'desc'
}

interface FiltersProps {
  filters: MenuItemFilters
  onFiltersChange: (filters: MenuItemFilters) => void
  onReset: () => void
}

const sortFieldOptions = [
  { value: 'name', label: 'Nome' },
  { value: 'price', label: 'Preço' },
  { value: 'createdAt', label: 'Criação' },
  { value: 'updatedAt', label: 'Atualização' }
]

export const MenuItemFilters = ({ filters, onFiltersChange, onReset }: FiltersProps) => {
  const handleFilterChange = (key: keyof MenuItemFilters, value: string | boolean | undefined) => {
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
            <Button variant="outlineSolid" size="md" as="div">
              <SortAscendingIcon size={20} weight="bold" />
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
                        sortField: option.value as 'name' | 'price' | 'createdAt' | 'updatedAt',
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
            <Button variant="outlineSolid" size="md" as="div">
              <FunnelSimpleIcon size={20} weight="bold" />
            </Button>
          }
        >
          <S.PopoverContent>
            <S.PopoverTitle>Filtros adicionais:</S.PopoverTitle>
            <S.PopoverOptions>
              <S.PopoverOption>
                <FormCheckbox
                  id="includeInactive"
                  label="Incluir itens inativos"
                  checked={filters.includeInactive}
                  onCheckedChange={(checked) => handleFilterChange('includeInactive', checked)}
                  fontSize="sm"
                />
              </S.PopoverOption>
            </S.PopoverOptions>
            <Button variant="outlineSolid" size="sm" onClick={onReset} style={{ marginTop: '1rem', width: '100%' }}>
              Limpar
            </Button>
          </S.PopoverContent>
        </Popover>
      </S.SearchContainer>
    </S.FilterContainer>
  )
}
