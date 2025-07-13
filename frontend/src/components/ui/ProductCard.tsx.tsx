'use client'

import { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
  getImageUrl: (path: string) => string | null
  onAdd: (product: Product) => void
  onRemove: (product: Product) => void
  index?: number
}

export default function ProductCard({ product, getImageUrl, onAdd, onRemove, index }: ProductCardProps) {
  return (
    <div
      key={`${product.id}-${index}`}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <img
          src={
            getImageUrl(product.imagem || '') ||
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="system-ui" font-size="16"%3ESem imagem%3C/text%3E%3C/svg%3E'
          }
          alt={product.nome}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="system-ui" font-size="16"%3ESem imagem%3C/text%3E%3C/svg%3E'
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">{product.nome}</h3>
        {product.categoria && (
          <p className="text-sm text-gray-500 mb-2 truncate">{product.categoria}</p>
        )}

        <p className="text-lg font-semibold text-gray-900">
          R$ {product.preco ? product.preco.toFixed(2).replace('.', ',') : '0,00'}
        </p>

        {product.descricao && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.descricao}</p>
        )}
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <span>Estoque: {product.quantidade_estoque ?? 0} unidades</span>
          <div className="flex items-center gap-2">
            <button
              className="hover:text-blue-600 transition-colors"
              onClick={() => onAdd(product)}
              title="Adicionar"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              className="hover:text-red-600 transition-colors"
              onClick={() => onRemove(product)}
              title="Remover"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
