import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import React from 'react'
import styled from 'styled-components'

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0;
`

const PaginationInfo = styled.span`
  font-size: 14px;
  color: #888;
`

const PaginationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const PageInfo = styled.span`
  font-size: 14px;
  color: #222;
  min-width: 60px;
  text-align: center;
`

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
    <PaginationContainer>
      <PaginationInfo>
        {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}{' '}
        itens
      </PaginationInfo>
      <PaginationActions>
        <Button size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={!hasPreviousPage} variant="ghost">
          <CaretLeftIcon size={20} weight="fill" />
          Anterior
        </Button>
        <PageInfo>
          {currentPage} de {totalPages}
        </PageInfo>
        <Button size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={!hasNextPage} variant="ghost">
          Próxima
          <CaretRightIcon size={20} weight="fill" />
        </Button>
      </PaginationActions>
    </PaginationContainer>
  )
}
