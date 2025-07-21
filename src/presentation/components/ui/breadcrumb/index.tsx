import { CaretRightIcon, HouseIcon } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'

import * as S from './styles'

interface BreadcrumbProps {
  lastPath?: string
}

export const Breadcrumb = ({ lastPath }: BreadcrumbProps) => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  const getPageTitle = (path: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      orders: 'Pedidos',
      menu: 'Menu',
      categories: 'Categorias',
      reports: 'Relatórios',
      missions: 'Missões',
      messages: 'Mensagens',
      settings: 'Configurações',
      'create-restaurant': 'Criar Restaurante'
    }
    return titles[path] || path
  }

  return (
    <S.Container>
      <S.BreadcrumbList>
        <S.BreadcrumbItem>
          <Link to="/dashboard">
            <HouseIcon size={20} weight="fill" />
          </Link>
        </S.BreadcrumbItem>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          const displayValue = isLast && lastPath ? lastPath : getPageTitle(value)
          return (
            <S.BreadcrumbItem key={to}>
              <CaretRightIcon size={16} weight="bold" />
              {isLast ? <S.CurrentPage>{displayValue}</S.CurrentPage> : <Link to={to}>{displayValue}</Link>}
            </S.BreadcrumbItem>
          )
        })}
      </S.BreadcrumbList>
    </S.Container>
  )
}
