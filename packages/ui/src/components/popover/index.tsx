import { useLayout } from '@menuxp/ui'

import * as S from './styles'

export const Popover = ({ className, ...props }: S.PopoverProps) => {
  const { layout } = useLayout()
  const variant = props.variant ?? 'outline'

  const classes = ['popover', variant, `layout-${layout}`, className].filter(Boolean).join(' ')

  return (
    <S.StyledPopover
      {...props}
      variant={variant}
      size={props.size ?? 'md'}
      side={props.side ?? 'bottom'}
      align={props.align ?? 'start'}
      sideOffset={props.sideOffset ?? 15}
      className={classes}
      style={{
        zIndex: 9999999,
        position: 'relative',
        ...props.style
      }}
    />
  )
}

Popover.displayName = 'Popover'

export default Popover
