import { ProductStoreState } from '@/types/productStore'
import { API_BASE_URL } from '@/utils/constants'
import { create } from 'zustand'


export const useProductStore = create<ProductStoreState>((set, get) => ({
  products: [],
  isLoading: true,
  isLoadingMore: false,
  error: null,
  page: 1,
  hasMore: true,

  nameFilter: '',
  minPrice: '',
  maxPrice: '',
  orderBy: 'createdAt',
  order: 'desc',

  setNameFilter: (value) => set({ nameFilter: value }),
  setMinPrice: (value) => set({ minPrice: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),
  setOrderBy: (value) => set({ orderBy: value }),
  setOrder: (value) => set({ order: value }),

  clearFilters: () =>
    set({
      nameFilter: '',
      minPrice: '',
      maxPrice: '',
      orderBy: 'createdAt',
      order: 'desc'
    }),

  fetchProducts: async (append = false) => {
    const {
      nameFilter,
      minPrice,
      maxPrice,
      orderBy,
      order,
      page,
      products,
    } = get()

    if (!append) {
      set({ isLoading: true, page: 1, products: [] }) 
    } else {
      set({ isLoadingMore: true })
    }
 
    try {
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', '10')
      if (nameFilter) params.append('nome', nameFilter)
      if (minPrice) params.append('precoMin', minPrice)
      if (maxPrice) params.append('precoMax', maxPrice)
      params.append('orderBy', orderBy)
      params.append('order', order)

      const res = await fetch(`${API_BASE_URL}/api/products?${params}`)
      if (!res.ok) throw new Error('Erro ao buscar produtos')
      const data = await res.json()

      set((state) => ({
        products: append ? [...state.products, ...data] : data,
        hasMore: data.length === 10,
        error: null
      }))
    } catch (err: any) {
      set({ error: err.message || 'Erro ao buscar produtos' })
    } finally {
      set({ isLoading: false, isLoadingMore: false })
    }
  },

  loadMore: () => {
    set((state) => ({ page: state.page + 1 }))
    get().fetchProducts(true)
  }
}))
