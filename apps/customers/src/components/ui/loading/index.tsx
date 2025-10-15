import { useRestaurant } from '@/hooks/use-restaurant'

import * as S from './styles'

interface LoadingProps {
  size?: number
}

export const Loading = ({ size }: LoadingProps) => {
  const { layout } = useRestaurant()

  return (
    <S.Container>
      <S.Spinner size={size} className={`loading-spinner layout-${layout}`} />
    </S.Container>
  )
}

Loading.displayName = 'Loading'
