'use client'

interface PaginationButtonProps {
  isLoading: boolean
  hasMore: boolean
  onLoadMore: () => void
}

export default function PaginationButton({
  isLoading,
  hasMore,
  onLoadMore,
}: PaginationButtonProps) {
  if (!hasMore) {
    return (
      <div className="mt-8 text-center text-gray-500 text-sm">
        Não há mais produtos para carregar
      </div>
    )
  }

  return (
    <div className="mt-8 text-center">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
              />
            </svg>
            Carregando...
          </span>
        ) : (
          'Ver mais'
        )}
      </button>
    </div>
  )
}
