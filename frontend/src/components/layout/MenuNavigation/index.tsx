'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import NavButton from '@/components/ui/NavButton'

export default function Navbar() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const router = useRouter()

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut({ callbackUrl: '/' })
    } else {
      router.push('/login')
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <a
              href="#"
              onClick={() => router.push('/')}
              className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
            >
              Produtos
            </a>
          </div>
          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <>
                <NavButton
                  onClick={() => router.push('/products/list')}
                  title="Lista de Produtos"
                  icon={
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  }
                />
                <NavButton
                  onClick={() => router.push('/products/new')}
                  title="Novo Produto"
                  icon={
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  }
                />
              </>
            )}
            <NavButton
              onClick={handleAuthClick}
              title={isAuthenticated ? 'Sair' : 'Entrar'}
              icon={
                isAuthenticated ? (
                  <svg className="w-6 h-6 text-gray-600 hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )
              }
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
