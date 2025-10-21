import { AddressForm } from '@/presentation/components/entities/settings/address-form'
import { BrandingForm } from '@/presentation/components/entities/settings/branding-form'
import { HoursForm } from '@/presentation/components/entities/settings/hours-form'
import { OperationsForm } from '@/presentation/components/entities/settings/operations-form'
import { TemplatesForm } from '@/presentation/components/entities/settings/templates-form'
import { Breadcrumb } from '@/presentation/components/ui/breadcrumb'
import { Loading } from '@menuxp/ui'
import { ClockIcon, FileTextIcon, GearIcon, MapPinLineIcon, PaletteIcon, UsersIcon } from '@phosphor-icons/react'
import { useState } from 'react'

import * as S from '../styles'

type TabType = 'branding' | 'address' | 'operations' | 'hours' | 'templates' | 'users'

export const SettingsPage = () => {
  const [isLoading, _setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('branding')

  const tabs = [
    { id: 'branding' as const, label: 'Branding', icon: <PaletteIcon size={20} /> },
    { id: 'address' as const, label: 'Endereço', icon: <MapPinLineIcon size={20} /> },
    { id: 'operations' as const, label: 'Operações', icon: <GearIcon size={20} /> },
    { id: 'hours' as const, label: 'Horários', icon: <ClockIcon size={20} /> },
    { id: 'templates' as const, label: 'Templates', icon: <FileTextIcon size={20} /> },
    { id: 'users' as const, label: 'Usuários', icon: <UsersIcon size={20} /> }
  ]

  const getTabContent = (tabId: TabType) => {
    const content = {
      branding: {
        title: 'Configurações de Branding',
        description: 'Personalize a aparência e identidade visual do seu restaurante'
      },
      address: {
        title: 'Endereço',
        description: 'Configure o endereço do seu restaurante'
      },
      operations: {
        title: 'Configurações de Operações',
        description: 'Configure tipos de operação, métodos de pagamento e taxas de entrega'
      },
      hours: {
        title: 'Horários de Funcionamento',
        description: 'Defina os horários de funcionamento para cada dia da semana'
      },
      templates: {
        title: 'Templates de Mensagens',
        description: 'Configure mensagens automáticas para diferentes status de pedidos'
      },
      users: {
        title: 'Usuários',
        description: 'Gerencie os usuários do seu restaurante'
      }
    }
    return content[tabId]
  }

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingWrapper>
          <Loading />
        </S.LoadingWrapper>
      </S.Container>
    )
  }

  const currentContent = getTabContent(activeTab)

  return (
    <S.Container>
      <Breadcrumb lastPath="Configurações" />
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
        <S.TabContent>
          {(() => {
            switch (activeTab) {
              case 'branding':
                return <BrandingForm />
              case 'address':
                return <AddressForm />
              case 'operations':
                return <OperationsForm />
              case 'hours':
                return <HoursForm />
              case 'templates':
                return <TemplatesForm />
              default:
                return (
                  <S.TabPlaceholder>
                    <S.TabPlaceholderIcon>{tabs.find((tab) => tab.id === activeTab)?.icon}</S.TabPlaceholderIcon>
                    <S.TabPlaceholderTitle>{currentContent.title}</S.TabPlaceholderTitle>
                    <S.TabPlaceholderText>{currentContent.description}</S.TabPlaceholderText>
                  </S.TabPlaceholder>
                )
            }
          })()}
        </S.TabContent>
      </S.TabsContainer>
    </S.Container>
  )
}
