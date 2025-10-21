import type { User } from '@/domain/models/user.model'
import { createContext } from 'react'

export interface Login {
  token: string
  user: User
  restaurantId?: string
}

export interface UpdateProfile {
  name: string
  avatar?: string
}

export type UpdateSubscription = User['subscription']

export const AuthContext = createContext(
  {} as {
    token: string | null
    user: User | null
    restaurantId: string | null
    login: ({ token, user, restaurantId }: Login) => void
    updateProfile: ({ name, avatar }: UpdateProfile) => void
    updateSubscription: ({ planId, features }: UpdateSubscription) => void
    updateRestaurantId: (restaurantId: string) => void
    logout: () => void
  }
)
