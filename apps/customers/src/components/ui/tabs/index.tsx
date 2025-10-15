import React, { useState } from 'react'

import * as S from './styles'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultValue?: string
  className?: string
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultValue, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.id)
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <S.TabsContainer className={className}>
      <S.TabsHeader>
        {tabs.map((tab, index) => (
          <S.TabButton
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            $isActive={activeTab === tab.id}
            $isFirst={index === 0}
          >
            {tab.label}
          </S.TabButton>
        ))}
      </S.TabsHeader>
      <S.TabContent>{activeContent}</S.TabContent>
    </S.TabsContainer>
  )
}

export { Tabs }
