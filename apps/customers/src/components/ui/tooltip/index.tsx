import { useRestaurant } from '@/hooks/use-restaurant'

import * as S from './styles'

export const Tooltip = ({
  children,
  trigger,
  placement = 'top',
  delay = 300,
  variant = 'default',
  className,
  style,
  ...props
}: S.TooltipProps) => {
  const { layout } = useRestaurant()

  const wrapperClasses = ['tooltip-wrapper', variant, `layout-${layout}`, className].filter(Boolean).join(' ')

  return (
    <S.TooltipWrapper className={wrapperClasses} style={style}>
      <S.VbssTooltipComponent trigger={trigger} placement={placement} delay={delay} {...props}>
        {children}
      </S.VbssTooltipComponent>
    </S.TooltipWrapper>
  )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
