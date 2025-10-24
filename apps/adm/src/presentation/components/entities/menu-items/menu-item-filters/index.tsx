import { Button, FormCheckbox, Popover } from '@menuxp/ui'
import { FunnelSimpleIcon, SortAscendingIcon } from '@phosphor-icons/react'

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
  isEmpty?: boolean
}

const sortFieldOptions = [
  { value: 'name', label: 'Nome' },
  { value: 'price', label: 'Preço' },
  { value: 'createdAt', label: 'Criação' },
  { value: 'updatedAt', label: 'Atualização' }
]

export const MenuItemFilters = ({ filters, onFiltersChange, onReset, isEmpty = false }: FiltersProps) => {
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
            <Button 
              variant="white" 
              size="sm" 
              as="div" 
              leftIcon={<SortAscendingIcon size={20} weight="bold" />}
              title="Ordenar itens"
              aria-label="Ordenar itens"
              disabled={isEmpty}
              className="icon-only"
            />
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
            <Button 
              variant="white" 
              size="sm" 
              as="div" 
              leftIcon={<FunnelSimpleIcon size={20} weight="bold" />}
              title="Filtros adicionais"
              aria-label="Filtros adicionais"
              disabled={isEmpty}
              className="icon-only"
            />
          }
        >
          <S.PopoverContent>
            <S.PopoverTitle>Filtros adicionais:</S.PopoverTitle>
            <S.PopoverOptions>
              <S.PopoverOption>
                <S.CheckboxWrapper>
                  <FormCheckbox
                    id="includeInactive"
                    label="Incluir itens inativos"
                    checked={filters.includeInactive}
                    onCheckedChange={(checked) => handleFilterChange('includeInactive', checked)}
                    fontSize="sm"
                    rounded="none"
                  />
                </S.CheckboxWrapper>
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
