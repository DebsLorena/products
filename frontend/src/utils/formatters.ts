export const formatPrice = (price: number): string => {
  return price ? price.toFixed(2).replace('.', ',') : '0,00'
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export const getImageUrl = (imagePath: string | undefined, baseUrl: string): string => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${baseUrl}${imagePath}`
}

export function getImageUrlRow(imagePath?: string): string | null {
  if (!imagePath) return null
  return imagePath.startsWith('http') ? imagePath : `http://localhost:3001${imagePath}`
}