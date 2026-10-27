import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import api from '../api/axios'

export type Role = 'admin' | 'client' | 'driver'

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  role: Role
  status: string
}

interface AuthCtx {
  user: User | null
  login: (login: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? (JSON.parse(saved) as User) : null
  })

  const login = async (login: string, password: string) => {
    const { data } = await api.post('/auth/login', { login, password })
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user as User
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
