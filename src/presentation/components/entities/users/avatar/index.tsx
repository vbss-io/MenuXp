import { UserCircleIcon } from '@phosphor-icons/react'

import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

interface AvatarProps {
  showName?: boolean
  avatarSize?: number
  direction?: 'row' | 'column'
}

export const Avatar = ({ showName = false, avatarSize = 32, direction = 'row' }: AvatarProps) => {
  const { user } = useAuth()

  return (
    <S.AvatarWrapper direction={direction} className="avatar-wrapper">
      {user?.avatar ? (
        <S.AvatarImg src={user.avatar} alt={`${user.username} avatar`} size={avatarSize} />
      ) : (
        <UserCircleIcon size={avatarSize} className="avatar-icon" />
      )}
      {showName && <S.AvatarName>{user?.name ?? user?.username}</S.AvatarName>}
    </S.AvatarWrapper>
  )
}
