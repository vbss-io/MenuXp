import { CaretRightIcon, HouseIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import * as S from './styles'

interface BreadcrumbProps {
  lastPath?: string
}

export const Breadcrumb = ({ lastPath }: BreadcrumbProps) => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const getPageTitle = (path: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      orders: 'Pedidos',
      menu: 'Cardápio',
      'menu-items': 'Items do Menu',
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

        {isMobile
          ? pathnames.length > 0 && (
              <S.BreadcrumbItem>
                <CaretRightIcon size={16} weight="bold" />
                <S.CurrentPage>{lastPath || getPageTitle(pathnames[pathnames.length - 1])}</S.CurrentPage>
              </S.BreadcrumbItem>
            )
          : pathnames.map((value, index) => {
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
