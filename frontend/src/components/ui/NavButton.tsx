'use client'

interface NavButtonProps {
  onClick: () => void
  title: string
  icon: React.ReactNode
}

export default function NavButton({ onClick, title, icon }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      title={title}
    >
      {icon}
    </button>
  )
}