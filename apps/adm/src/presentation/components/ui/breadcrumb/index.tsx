import { CaretRightIcon, HouseIcon, InfoIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { UserMenu } from '@/presentation/components/ui/user-menu'
import { Tooltip } from '@menuxp/ui'

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
      reports: 'Relatórios',
      missions: 'Missões',
      messages: 'Mensagens',
      settings: 'Configurações',
      'create-restaurant': 'Criar Restaurante'
    }
    return titles[path] || path
  }

  const getPageDescription = (path: string) => {
    const descriptions: Record<string, string> = {
      dashboard: 'Gerencie a operação do seu restaurante',
      orders: 'Visualize e gerencie todos os pedidos recebidos',
      menu: 'Configure e personalize o cardápio do seu restaurante',
      'menu-items': 'Adicione e edite os itens disponíveis no seu cardápio',
      reports: 'Acompanhe relatórios e métricas de performance',
      missions: 'Complete missões e ganhe recompensas',
      messages: 'Gerencie mensagens e comunicação com clientes',
      settings: 'Configure as preferências e configurações do sistema',
      'create-restaurant': 'Configure os dados básicos do seu restaurante'
    }
    return descriptions[path] || 'Informações sobre esta página'
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
                <Tooltip trigger={<InfoIcon size={20} weight="fill" />}>
                  {getPageDescription(pathnames[pathnames.length - 1])}
                </Tooltip>
              </S.BreadcrumbItem>
            )
          : pathnames.length > 0 && (
              <S.BreadcrumbItem>
                <CaretRightIcon size={16} weight="bold" />
                <S.CurrentPage>{lastPath || getPageTitle(pathnames[pathnames.length - 1])}</S.CurrentPage>
                <Tooltip trigger={<InfoIcon size={20} weight="fill" />}>
                  {getPageDescription(pathnames[pathnames.length - 1])}
                </Tooltip>
              </S.BreadcrumbItem>
            )}
      </S.BreadcrumbList>
      <S.UserMenuWrapper>
        <UserMenu />
      </S.UserMenuWrapper>
    </S.Container>
  )
}
