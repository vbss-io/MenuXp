import React from 'react'

import { useRestaurant } from '@/hooks/use-restaurant'
import * as S from './styles'

export type DialogProps = React.ComponentProps<typeof S.StyledDialog>

export const Dialog = ({ className, ...props }: DialogProps) => {
  const { layout } = useRestaurant()

  const classes = ['dialog', `layout-${layout}`, className].filter(Boolean).join(' ')

  return (
    <S.StyledDialog
      {...props}
      rounded={props.rounded ?? 'none'}
      fontSize={props.fontSize ?? 'sm'}
      className={classes}
    />
  )
}

Dialog.displayName = 'Dialog'

export default Dialog
