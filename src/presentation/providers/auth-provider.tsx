import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import type { User } from '@/domain/models/user.model'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'
import { type Login, type UpdateProfile, AuthContext } from '@/presentation/contexts/auth-context'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const localStorage = Registry.getInstance().inject('localStorage') as LocalStorage

  const [token, setToken] = useState<string | null>(localStorage.get('token'))
  const [user, setUser] = useState<User | null>(localStorage.get('user'))

  useEffect(() => {
    window.addEventListener('Logout', logout)
    return () => {
      window.removeEventListener('Logout', logout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async ({ token, user }: Login) => {
    try {
      setToken(token)
      localStorage.set('token', token)
      setUser(user)
      localStorage.set('user', user)
    } catch {
      toast.error('Falha ao fazer login. Por favor, tente novamente.')
      logout()
    }
  }

  const updateProfile = async ({ name, avatar }: UpdateProfile) => {
    try {
      const previousUser = user as User
      setUser({ ...previousUser, name, avatar })
      localStorage.set('user', { ...previousUser, name, avatar })
    } catch {
      toast.error('Falha ao atualizar perfil')
    }
  }

  const logout = () => {
    if (!user) return
    // localStorage.clear()
    localStorage.remove('token')
    localStorage.remove('user')
    setToken('')
    setUser(null)
    window.location.assign('/')
  }

  return <AuthContext.Provider value={{ token, user, login, updateProfile, logout }}>{children}</AuthContext.Provider>
}
