import { Button, ICONS, ICONS_KEYS, Popover } from '@menuxp/ui'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'

interface IconSelectorProps {
  selectedIcon?: string
  onIconSelect: (icon: string) => void
  placeholder?: string
  disabled?: boolean
}

export const IconSelector = ({
  selectedIcon,
  onIconSelect,
  placeholder = 'Selecionar ícone',
  disabled = false
}: IconSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const handleIconSelect = (icon: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    onIconSelect(icon)
    setIsOpen(false)
  }

  const ICONS_PER_PAGE = 24
  const totalIcons = Object.keys(ICONS_KEYS).length
  const totalPages = Math.ceil(totalIcons / ICONS_PER_PAGE)

  const currentPageIcons = useMemo(() => {
    const startIndex = currentPage * ICONS_PER_PAGE
    return Object.entries(ICONS_KEYS).slice(startIndex, startIndex + ICONS_PER_PAGE)
  }, [currentPage])

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  const selectedIconKey = selectedIcon ? ICONS_KEYS[selectedIcon] : null
  const SelectedIconComponent = selectedIconKey ? ICONS[selectedIconKey as keyof typeof ICONS] : null

  return (
    <div>
      <Popover
        variant="outline"
        side="bottom"
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <Button variant="outline" size="md" disabled={disabled} type="button" onClick={() => setIsOpen(!isOpen)}>
            {SelectedIconComponent ? <SelectedIconComponent size={20} /> : <span>{placeholder}</span>}
          </Button>
        }
      >
        <div>
          <h3>Selecionar Ícone</h3>
          <div className="icons-grid">
            {currentPageIcons.map(([key, iconName]) => {
              const IconComponent = ICONS[iconName as keyof typeof ICONS]
              return (
                <button
                  key={key}
                  onClick={(e) => handleIconSelect(key, e)}
                  className={`icon-button ${selectedIcon === key ? 'selected' : ''}`}
                  title={key}
                  type="button"
                >
                  {IconComponent && <IconComponent size={18} />}
                </button>
              )
            })}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="pagination-button"
                type="button"
              >
                <CaretLeftIcon size={16} />
              </button>
              <span className="pagination-info">
                {currentPage + 1} de {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="pagination-button"
                type="button"
              >
                <CaretRightIcon size={16} />
              </button>
            </div>
          )}
        </div>
      </Popover>
    </div>
  )
}
