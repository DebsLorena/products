'use client'
import { useEffect, useState } from 'react'
import ProductForm from '@/components/fetures/ProductForm'
import { useRouter } from 'next/navigation'
import { useProductForm } from '@/hooks/useProductForm'
import { useSession } from 'next-auth/react'

export default function ProductCreatePage() {
  const router = useRouter()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const session = useSession()
  const {
    formData,
    previewImage,
    currentImage,
    error,
    success,
    isSubmitting,
    handleChange,
    handleImageChange,
    handleSubmit
  } = useProductForm({ isEditMode: false })

  useEffect(() => {
    if (session?.data?.user?.access_token === undefined) {
      router.push('/login')
    } else {
      setIsCheckingAuth(false)
    }
  }, [router])

  if (isCheckingAuth) return <div>Carregando...</div>

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Novo Produto
          </h2>
          <ProductForm
            formData={formData}
            isEditMode={false}
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
