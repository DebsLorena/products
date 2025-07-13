'use client'

import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import FilterForm from '@/components/fetures/FilterForm'
import Navbar from '@/components/layout/MenuNavigation'
import PaginationButton from '@/components/layout/PaginationButton'
import EmptyState from '@/components/ui/EmptyState'
import ErrorMessage from '@/components/ui/ErrorMessage'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useProductStore } from '@/store/useProductStore'
import ProductList from '@/components/fetures/ProductList.tsx'
import { useOrderStore } from '@/store/useOrderStore'
import toast from 'react-hot-toast'
import { Product } from '@/types/product'
import OrderModal from '@/components/fetures/OrderModal'
import { API_BASE_URL } from '@/utils/constants'

export default function HomePage() {
  const { orderList, addProduct, removeProduct, clearOrder } = useOrderStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    products,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    page,
    nameFilter,
    minPrice,
    maxPrice,
    orderBy,
    order,
    setNameFilter,
    setMinPrice,
    setMaxPrice,
    setOrderBy,
    setOrder,
    clearFilters,
    fetchProducts,
    loadMore
  } = useProductStore()

  const [debouncedName] = useDebounce(nameFilter, 400)
  const [debouncedMin] = useDebounce(minPrice, 400)
  const [debouncedMax] = useDebounce(maxPrice, 400)

  useEffect(() => {
    fetchProducts(false)
  }, [debouncedName, debouncedMin, debouncedMax, orderBy, order])

  const handleOrderChange = (value: string) => {
    const [newOrderBy, newOrder] = value.split('-')
    setOrderBy(newOrderBy)
    setOrder(newOrder)
  }

  const handleAddProduct = (product: Product) => {
    addProduct(product)
    toast.success(`${product.nome} adicionado à lista!`)
  }

  const handleRemoveProduct = (product: Product) => {
    removeProduct(product)
    toast.success(`${product.nome} removido da lista!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Produtos</h1>

        <FilterForm
          nameFilter={nameFilter}
          minPrice={minPrice}
          maxPrice={maxPrice}
          orderBy={orderBy}
          order={order}
          onChangeName={setNameFilter}
          onChangeMin={setMinPrice}
          onChangeMax={setMaxPrice}
          onOrderChange={handleOrderChange}
          onClear={clearFilters}
        />

        {isLoading && products.length === 0 && <LoadingSpinner />}
        {error && products.length === 0 && <ErrorMessage message={error} />}
        {products.length > 0 && (
          <>
            <ProductList products={products} onAdd={handleAddProduct} onRemove={handleRemoveProduct} />
            <PaginationButton isLoading={isLoadingMore} hasMore={hasMore} onLoadMore={loadMore} />
          </>
        )}
        {!isLoading && !error && products.length === 0 && <EmptyState />}
      </main>

      <button
        className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        Ver Lista ({orderList.length})
      </button>

      {isModalOpen && (
        <OrderModal
          isOpen={isModalOpen}
          orderList={orderList}
          onClose={() => setIsModalOpen(false)}
          onSubmit={async () => {
            try {
              const payload = {
                produtos: orderList.map((item) => ({
                  productId: item.id,
                  quantidade: item.quantidade,
                })),
              }

              const response = await fetch(`${API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              })

              if (!response.ok) {
                const errorText = await response.text()
                toast.error(`Erro do servidor: ${errorText}`)
                return
              }

              toast.success(`Pedido criado com sucesso.`)
              clearOrder()
              setIsModalOpen(false)
            } catch (error) {
              toast.error('Erro inesperado ao enviar pedido.')
            }
          }}
        />
      )}
    </div>
  )
}
