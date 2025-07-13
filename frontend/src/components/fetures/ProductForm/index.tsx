'use client'

import { ChangeEvent, FormEvent } from 'react'
import InputField from '@/components/ui/Input'

interface ProductFormProps {
  formData: {
    nome: string
    categoria: string
    descricao: string
    preco: string
    quantidade_estoque: string
    imagem: File | null
  }
  isEditMode: boolean
  currentImage: string
  previewImage: string
  error: string
  success: string
  isSubmitting: boolean
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleTextAreaChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function ProductForm({
  formData,
  isEditMode,
  currentImage,
  previewImage,
  error,
  success,
  isSubmitting,
  handleChange,
  handleTextAreaChange,
  handleImageChange,
  handleSubmit
}: ProductFormProps) {
  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 rounded-md p-3 text-sm mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Nome"
          id="nome"
          name="nome"
          type="text"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome do produto"
        />

        <InputField
          label="Categoria"
          id="categoria"
          name="categoria"
          type="text"
          value={formData.categoria}
          onChange={handleChange}
          placeholder="Categoria do produto"
        />
        <InputField
          label="Descrição"
          id="descricao"
          name="descricao"
          type="text"
          value={formData.descricao}
          onChange={handleTextAreaChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Descrição do produto"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Preço (R$)"
            id="preco"
            name="preco"
            type="number"
            value={formData.preco}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="0,00"
            step="0.01"
            min="0"
          />
          <InputField
            label="Quantidade em Estoque"
            id="quantidade_estoque"
            name="quantidade_estoque"
            type="number"
            value={formData.quantidade_estoque}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isEditMode ? 'Nova Imagem (opcional)' : 'Imagem'}
          </label>

          {isEditMode && currentImage && !previewImage && (
            <div className="mb-2">
              <p className="text-sm text-gray-600 mb-1">Imagem atual:</p>
              <img
                src={currentImage}
                alt="Imagem atual"
                className="h-48 object-cover rounded-md border"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />

          {previewImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Nova imagem:</p>
              <img
                src={previewImage}
                alt="Pré-visualização"
                className="h-48 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? (isEditMode ? 'Atualizando...' : 'Salvando...')
            : (isEditMode ? 'Atualizar Produto' : 'Salvar Produto')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <a href="/products/list" className="text-sm text-gray-600 hover:text-gray-900">
          ← Voltar para lista
        </a>
      </div>
    </>
  )
}
