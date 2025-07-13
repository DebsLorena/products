import { Product } from "./product"


export type ProductStoreState = {
  products: Product[]
  isLoading: boolean
  isLoadingMore: boolean
  error: string | null
  page: number
  hasMore: boolean

  nameFilter: string
  minPrice: string
  maxPrice: string
  orderBy: string
  order: string

  setNameFilter: (value: string) => void
  setMinPrice: (value: string) => void
  setMaxPrice: (value: string) => void
  setOrderBy: (value: string) => void
  setOrder: (value: string) => void
  clearFilters: () => void

  fetchProducts: (append?: boolean) => Promise<void>
  loadMore: () => void
}
