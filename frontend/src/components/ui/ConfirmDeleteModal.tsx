'use client'

import React from 'react'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  productName: string
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, productName }: ConfirmDeleteModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h2 className="text-lg font-semibold text-gray-800">Confirmar exclusão</h2>
        <p className="mt-2 text-gray-600">Deseja realmente excluir o produto <strong>{productName}</strong>?</p>

        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-rose-800 text-white rounded-md hover:bg-rose-900 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
