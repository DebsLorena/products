'use client'

interface Props {
  message: string
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
      {message}
    </div>
  )
}
