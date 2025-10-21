import React from 'react'

import { useLayout } from '@menuxp/ui'

import * as S from './styles'

export type DialogProps = React.ComponentProps<typeof S.StyledDialog>

export const Dialog = ({ className, ...props }: DialogProps) => {
  const { layout } = useLayout()

  const classes = ['dialog', `layout-${layout}`, className].filter(Boolean).join(' ')

  return (
    <S.StyledDialog
      {...props}
      rounded={props.rounded ?? 'none'}
      fontSize={props.fontSize ?? 'sm'}
      className={classes}
    >
      <S.SeparatorLine />
      {props.children}
    </S.StyledDialog>
  )
}

Dialog.displayName = 'Dialog'

export default Dialog
