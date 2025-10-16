import { useLayout } from '@menuxp/ui'

import * as S from './styles'

interface LoadingProps {
  size?: number
}

export const Loading = ({ size }: LoadingProps) => {
  const { layout } = useLayout()

  return (
    <S.Container>
      <S.Spinner size={size} className={`loading-spinner layout-${layout}`} />
    </S.Container>
  )
}

Loading.displayName = 'Loading'
