import { createContext } from 'react'

import type { User } from '@/domain/models/user.model'

export interface Login {
  token: string
  user: User
}

export interface UpdateProfile {
  name?: string
  avatar?: string
}

export const AuthContext = createContext(
  {} as {
    token: string | null
    user: User | null
    login: ({ token, user }: Login) => void
    updateProfile: ({ name, avatar }: UpdateProfile) => void
    logout: () => void
  }
)
