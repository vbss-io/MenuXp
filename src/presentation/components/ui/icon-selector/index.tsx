import { Button } from '@vbss-ui/button'
import { Popover } from '@vbss-ui/popover'
import { ICONS_KEYS, ICONS } from '@/domain/consts/icons.const'

import * as S from './styles'

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
  const handleIconSelect = (icon: string) => {
    onIconSelect(icon)
  }

  const selectedIconKey = selectedIcon ? ICONS_KEYS[selectedIcon] : null
  const SelectedIconComponent = selectedIconKey ? ICONS[selectedIconKey as keyof typeof ICONS] : null

  return (
    <div>
      <Popover
        variant="outline"
        side="bottom"
        trigger={
          <Button variant="outlineSolid" size="md" as="div" disabled={disabled}>
            {SelectedIconComponent ? (
              <>
                <SelectedIconComponent size={20} />
                <span>{selectedIcon}</span>
              </>
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        }
      >
        <S.PopoverContent>
          <S.PopoverTitle>Selecionar Ícone</S.PopoverTitle>
          <S.IconsGrid>
            {Object.entries(ICONS_KEYS).map(([key, iconName]) => {
              const IconComponent = ICONS[iconName as keyof typeof ICONS]
              return (
                <S.IconButton
                  key={key}
                  onClick={() => handleIconSelect(key)}
                  selected={selectedIcon === key}
                  title={key}
                  type="button"
                >
                  {IconComponent && <IconComponent size={20} />}
                </S.IconButton>
              )
            })}
          </S.IconsGrid>
        </S.PopoverContent>
      </Popover>
    </div>
  )
}
