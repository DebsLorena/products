
import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from '@/utils/constants'
import { useSession } from 'next-auth/react'

interface FormData {
  nome: string
  categoria: string
  descricao: string
  preco: string
  quantidade_estoque: string
  imagem: File | null
}

interface UseProductFormProps {
  initialData?: Partial<FormData>
  isEditMode: boolean
  productSlug?: string
}

export function useProductForm({ initialData = {}, isEditMode, productSlug }: UseProductFormProps) {
  const router = useRouter()
  const session = useSession()
  const [formData, setFormData] = useState<FormData>({
    nome: initialData.nome || '',
    categoria: initialData.categoria || '',
    descricao: initialData.descricao || '',
    preco: initialData.preco || '',
    quantidade_estoque: initialData.quantidade_estoque || '',
    imagem: initialData.imagem || null,
  })
  const [previewImage, setPreviewImage] = useState('')
  const [currentImage, setCurrentImage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, imagem: file }))
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const preco = Number(formData.preco)
    const quantidade = Number(formData.quantidade_estoque)

    if (
      !formData.nome.trim() ||
      !formData.categoria.trim() ||
      !formData.descricao.trim() ||
      isNaN(preco) || preco <= 0 ||
      isNaN(quantidade) || quantidade < 0
    ) {
      setError('Preencha todos os campos corretamente')
      return
    }

    if (session.data?.user?.access_token === undefined) {
      setError('Usuário não autenticado')
      router.push('/login')
      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('nome', formData.nome.trim())
      formDataToSend.append('categoria', formData.categoria.trim())
      formDataToSend.append('descricao', formData.descricao.trim())
      formDataToSend.append('preco', preco.toString())
      formDataToSend.append('quantidade_estoque', quantidade.toString())

      if (formData.imagem) {
        formDataToSend.append('imagem', formData.imagem)
      }

      const url = isEditMode
        ? `${API_BASE_URL}/api/products/${productSlug}`
        : `${API_BASE_URL}/api/products`

      const method = isEditMode ? 'PATCH' : 'POST'
      const token = session.data?.user?.access_token
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || `Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} produto`)
      }

      setSuccess(`Produto ${isEditMode ? 'atualizado' : 'criado'} com sucesso!`)
      setTimeout(() => router.push('/products/list'), 1500)
    } catch (err: unknown) {
      setError((err as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
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
    handleSubmit,
  }
}
