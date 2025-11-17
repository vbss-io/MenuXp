import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { GeneralInfoTab } from '@/presentation/pages/dashboard/profile/components/general-info-tab'
import { SecurityTab } from '@/presentation/pages/dashboard/profile/components/security-tab'
import { LockKeyIcon, UserIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import * as S from '../styles'

type TabType = 'general' | 'security'

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('general')

  const tabs = [
    { id: 'general' as const, label: 'Info Geral', icon: <UserIcon size={20} /> },
    { id: 'security' as const, label: 'Segurança', icon: <LockKeyIcon size={20} /> }
  ]

  const getTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralInfoTab />
      case 'security':
        return <SecurityTab />
      default:
        return <GeneralInfoTab />
    }
  }

  return (
    <S.Container>
      <Breadcrumb lastPath="Perfil" />
      <S.Header />
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
