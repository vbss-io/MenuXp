import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import React from 'react'

import { Button } from '@menuxp/ui'

import * as S from './styles'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  if (totalPages <= 1) return null

  return (
    <S.PaginationContainer>
      <S.PaginationInfo>
        {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}{' '}
        itens
      </S.PaginationInfo>
      <S.PaginationActions>
        <Button
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          variant="outline"
          leftIcon={<CaretLeftIcon size={20} weight="fill" />}
        >
          Anterior
        </Button>
        <S.PageInfo>
          {currentPage} de {totalPages}
        </S.PageInfo>
        <Button
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          variant="outline"
          leftIcon={<CaretRightIcon size={20} weight="fill" />}
        >
          Próxima
        </Button>
      </S.PaginationActions>
    </S.PaginationContainer>
  )
}
