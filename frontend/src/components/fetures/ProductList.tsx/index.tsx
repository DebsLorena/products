'use client'

import ProductCard from "@/components/ui/ProductCard.tsx"
import { Product } from "@/types/product"


interface ProductListProps {
  products: Product[]
  onAdd: (product: Product) => void
  onRemove: (product: Product) => void
}

export default function ProductList({ products, onAdd, onRemove }: ProductListProps) {

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null
    if (imagePath.startsWith('http')) return imagePath
    return `http://localhost:3001${imagePath}`
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          getImageUrl={getImageUrl}
          index={index}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}
