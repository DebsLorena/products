'use client'

import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import InputField from '@/components/ui/Input'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!formData.email || !formData.password) {
      setError('Preencha todos os campos')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })

      if (!res || res.error) {
        setError(res?.error || 'Erro ao fazer login')
      } else {
        router.push('/products/new')
      }
    } catch {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">Entrar no Sistema</h2>
          <form onSubmit={handleSubmit} className="space-y-6">


            <InputField
              label="E-mail"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            <InputField
              label="Senha"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-600 hover:text-gray-900">← Voltar para produtos</a>
          </div>
        </div>
      </div>
    </div>
  )
}
