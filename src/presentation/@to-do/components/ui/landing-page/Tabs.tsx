// To-Do: Refatorar styles and remove tailwind
import React, { useState } from 'react'

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
    <div className={`${className} w-full overflow-x-hidden`}>
      <div className="tabs-brut mb-6 w-full">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            data-state={activeTab === tab.id ? 'active' : 'inactive'}
            className={`flex-1 px-4 py-2 ${index > 0 ? 'border-l border-black' : ''} 
              bg-gray-200 text-gray-700 
              data-[state=active]:!bg-yellow-400 data-[state=active]:!text-black`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content w-full">{activeContent}</div>
    </div>
  )
}

export default Tabs
