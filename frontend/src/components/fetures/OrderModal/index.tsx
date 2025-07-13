'use client'

import { OrderItem } from "@/types/orderItem"

interface OrderModalProps {
  isOpen: boolean
  orderList: OrderItem[]
  onClose: () => void
  onSubmit: () => Promise<void>
}

export default function OrderModal({ isOpen, orderList, onClose, onSubmit }: OrderModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md text-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>

        {orderList.length === 0 ? (
          <p className="text-gray-600">Nenhum produto adicionado.</p>
        ) : (
          <ul className="space-y-2">
            {orderList.map((item) => (
              <li key={item.id} className="flex justify-between border-b pb-1">
                <span>{item.nome}</span>
                <span className="font-semibold">Qtd: {item.quantidade}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 mr-2"
            onClick={onClose}
          >
            Fechar
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
            onClick={onSubmit}
          >
            Enviar Pedido
          </button>
        </div>
      </div>
    </div>
  )
}
