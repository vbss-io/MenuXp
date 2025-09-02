import { BowlFoodIcon, FolderIcon, PackageIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import { MenuItemsTab } from '@/presentation/pages/dashboard/menu-items/components/menu-items-tab'
import { CategoriesTab } from '@/presentation/pages/dashboard/menu-items/components/categories-tab'
import { CombosTab } from '@/presentation/pages/dashboard/menu-items/components/combos-tab'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'

import * as S from './styles'

type TabType = 'items' | 'categories' | 'combos'

export const MenuItemsPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('items')
  const [currentPage, setCurrentPage] = useState(1)

  const tabs = [
    { id: 'items' as const, label: 'Itens', icon: <BowlFoodIcon size={20} /> },
    { id: 'categories' as const, label: 'Categorias', icon: <FolderIcon size={20} /> },
    { id: 'combos' as const, label: 'Combos', icon: <PackageIcon size={20} /> }
  ]

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getTabContent = () => {
    switch (activeTab) {
      case 'items':
        return <MenuItemsTab currentPage={currentPage} onPageChange={handlePageChange} />
      case 'categories':
        return <CategoriesTab currentPage={currentPage} onPageChange={handlePageChange} />

      case 'combos':
        return <CombosTab currentPage={currentPage} onPageChange={handlePageChange} />
      default:
        return <MenuItemsTab currentPage={currentPage} onPageChange={handlePageChange} />
    }
  }

  return (
    <S.Container>
      <Breadcrumb lastPath="Itens do Menu" />
      <S.Header>
        <S.Subtitle>Gerencie os itens do menu do seu restaurante</S.Subtitle>
      </S.Header>
      <S.TabsContainer>
        <S.TabsHeader>
          {tabs.map((tab) => (
            <S.TabButton key={tab.id} $isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            </S.TabButton>
          ))}
        </S.TabsHeader>
        <S.TabContent>{getTabContent()}</S.TabContent>
      </S.TabsContainer>
    </S.Container>
  )
}
