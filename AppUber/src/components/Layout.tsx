import type { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import LogoutButton from './LogoutButton'

const roleLabel = { client: 'Cliente', driver: 'Conductor', admin: 'Administrador' }

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  return (
    <>
      <header className="topbar">
        <strong className="brand">AppUber</strong>
        {user && (
          <div className="topbar-user">
            <span>
              {user.name} · {roleLabel[user.role]}
            </span>
            <LogoutButton />
          </div>
        )}
      </header>
      <main className="container">{children}</main>
    </>
  )
}
