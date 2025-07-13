'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/MenuNavigation'
import ErrorMessage from '@/components/ui/ErrorMessage'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import EmptyState from '@/components/ui/EmptyState'
import ProductTable from '@/components/fetures/ProductTable'
import { API_BASE_URL } from '@/utils/constants'
import { Product } from '@/types/product'
import { useSession } from 'next-auth/react'


export default function ProductsListPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (products.length > 0) return
    fetchProducts()
  }, [products])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/products?limit=1000&orderBy=createdAt&order=desc`)
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos')
      }
      const data = await response.json()
      setProducts(data)
      setError(null)
    } catch (err: unknown) {
      setError((err as Error).message || 'Erro ao buscar produtos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Lista de Produtos</h1>
        </div>
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && products.length > 0 && (
          <ProductTable products={products} setProducts={setProducts} />
        )}
        {!isLoading && !error && products.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12">
            <EmptyState message="Nenhum produto cadastrado ainda." />
            <div className="mt-4 text-center">
              <button
                onClick={() => router.push('/products/new')}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm"
              >
                Criar Primeiro Produto
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}