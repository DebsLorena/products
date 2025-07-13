import { create } from 'zustand'
import { Product } from '@/types/product'

interface OrderItem {
  id: string
  nome: string
  quantidade: number
}

interface OrderState {
  orderList: OrderItem[]
  addProduct: (product: Product) => void
  removeProduct: (product: Product) => void
  clearOrder: () => void
}

export const useOrderStore = create<OrderState>((set) => ({
  orderList: [],
  addProduct: (product) =>
    set((state) => {
      const existing = state.orderList.find((p) => p.id === product.id)
      if (existing) {
        return {
          orderList: state.orderList.map((p) =>
            p.id === product.id ? { ...p, quantidade: p.quantidade + 1 } : p
          ),
        }
      } else {
        return {
          orderList: [...state.orderList, { id: product.id, nome: product.nome, quantidade: 1 }],
        }
      }
    }),
  removeProduct: (product) =>
    set((state) => {
      const existing = state.orderList.find((p) => p.id === product.id)
      if (!existing) return { orderList: state.orderList }
      if (existing.quantidade === 1) {
        return { orderList: state.orderList.filter((p) => p.id !== product.id) }
      } else {
        return {
          orderList: state.orderList.map((p) =>
            p.id === product.id ? { ...p, quantidade: p.quantidade - 1 } : p
          ),
        }
      }
    }),
  clearOrder: () => set({ orderList: [] }),
}))
