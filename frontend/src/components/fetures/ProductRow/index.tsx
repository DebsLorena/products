'use client'

import { formatDate, formatPrice, getImageUrlRow } from '@/utils/formatters'

interface Product {
  id: string
  nome: string
  categoria: string
  descricao: string
  preco: number
  quantidade_estoque: number
  imagem?: string
  createdAt: string
  updatedAt: string
}

interface Props {
  product: Product
  onEdit: (id: string) => void
  onDelete: (e: React.MouseEvent, id: string, nome: string) => void
  isDeleting: boolean
}

export default function ProductRow({ product, onEdit, onDelete, isDeleting }: Props) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-200">
          {product.imagem ? (
            <img
              src={getImageUrlRow(product.imagem) ?? ''}
              alt={product.nome}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,...'
              }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
              📷
            </div>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium max-w-[150px] truncate">
        {product.nome}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-gray-700 max-w-[120px] truncate">
        {product.categoria}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-gray-700 max-w-[120px] truncate">
        {product.descricao}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
        {formatPrice(product.preco)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={product.quantidade_estoque < 10 ? 'text-red-600 font-medium' : 'text-gray-700'}>
          {product.quantidade_estoque}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(product.createdAt)}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(product.id)
            }}
            className="p-1 rounded-md text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition-colors"
            title="Editar"
          >
            ✏️
          </button>
          <button
            onClick={(e) => onDelete(e, product.id, product.nome)}
            disabled={isDeleting}
            className="p-1 rounded-md text-red-600 hover:text-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Excluir"
          >
            {isDeleting ? '...' : '🗑️'}
          </button>
        </div>
      </td>
    </tr>
  )
}
