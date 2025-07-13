'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ProductForm from '@/components/fetures/ProductForm'
import { useProductForm } from '@/hooks/useProductForm'
import { API_BASE_URL } from '@/utils/constants'
import { useSession } from 'next-auth/react'

export default function ProductEditPage() {
  const router = useRouter()
  const params = useParams()
  const productSlug = params?.productSlug as string

  const {
    formData,
    previewImage,
    currentImage,
    error,
    success,
    isSubmitting,
    setFormData,
    setCurrentImage,
    handleChange,
    handleImageChange,
    handleSubmit
  } = useProductForm({ isEditMode: true, productSlug })

  const [isLoading, setIsLoading] = useState(true)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)


  const session = useSession()

  useEffect(() => {
    if (session?.data?.user?.access_token === undefined) {
      router.push('/login')
      return
    }
    setIsCheckingAuth(false)
  }, [router])

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${productSlug}`)
        if (!res.ok) throw new Error('Erro ao buscar produto')

        const product = await res.json()
        setFormData({
          nome: product.nome,
          categoria: product.categoria,
          descricao: product.descricao,
          preco: product.preco.toString(),
          quantidade_estoque: product.quantidade_estoque.toString(),
          imagem: null
        })

        if (product.imagem) {
          const imageUrl = product.imagem.startsWith('http')
            ? product.imagem
            : `http://localhost:3001${product.imagem}`
          setCurrentImage(imageUrl)
        }
      } catch {
      } finally {
        setIsLoading(false)
      }
    }
    if (productSlug) fetchProduct()
  }, [productSlug, setFormData, setCurrentImage])

  if (isCheckingAuth || isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Editar Produto
          </h2>
          <ProductForm
            formData={formData}
            isEditMode={true}
            currentImage={currentImage}
            previewImage={previewImage}
            error={error}
            success={success}
            isSubmitting={isSubmitting}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleTextAreaChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
