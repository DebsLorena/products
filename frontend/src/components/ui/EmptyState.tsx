'use client'

interface Props {
  message?: string
}

export default function EmptyState({ message = 'Nenhum produto encontrado.' }: Props) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">{message}</p>
    </div>
  )
}
