'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ProductRow from '../ProductRow'
import { Product } from '@/types/product'
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal'
import PaginationButton from '@/components/layout/PaginationButton'
import { API_BASE_URL } from '@/utils/constants'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'


interface Props {
  products: Product[]
  setProducts: (products: Product[]) => void
}

const ITEMS_PER_PAGE = 10

export default function ProductTable({ products, setProducts }: Props) {
  const router = useRouter()
  const session = useSession()

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{ id: string, nome: string } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const visibleProducts = products.slice(0, currentPage * ITEMS_PER_PAGE)
  const hasMore = products.length > visibleProducts.length

  const handleDeleteClick = (e: React.MouseEvent, id: string, nome: string) => {
    e.stopPropagation()
    setSelectedProduct({ id, nome })
    setIsModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedProduct) return
    setDeletingId(selectedProduct.id)
    setIsModalOpen(false)

    try {
      const token = session.data?.user?.access_token
      const response = await fetch(`${API_BASE_URL}/api/products/${selectedProduct.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Erro ao excluir')

      setProducts(products.filter(p => p.id !== selectedProduct.id))
    } catch (err) {
      toast.error('Erro ao excluir')
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/products/edit/${id}`)
  }

  const loadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1)
      setIsLoadingMore(false)
    }, 300)
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagem</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {visibleProducts.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              isDeleting={deletingId === product.id}
            />
          ))}
        </tbody>
      </table>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        productName={selectedProduct?.nome || ''}
      />
      <PaginationButton
        isLoading={isLoadingMore}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  )
}
