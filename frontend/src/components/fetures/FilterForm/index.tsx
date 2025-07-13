'use client'

import InputField from "../../ui/Input"

interface FilterFormProps {
  nameFilter: string
  minPrice: string
  maxPrice: string
  orderBy: string
  order: string
  onChangeName: (value: string) => void
  onChangeMin: (value: string) => void
  onChangeMax: (value: string) => void
  onOrderChange: (value: string) => void
  onClear: () => void
}

export default function FilterForm({
  nameFilter,
  minPrice,
  maxPrice,
  orderBy,
  order,
  onChangeName,
  onChangeMin,
  onChangeMax,
  onOrderChange,
  onClear
}: FilterFormProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InputField
          label="Buscar por nome"
          id="name"
          value={nameFilter}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="Digite o nome..."
        />
        <InputField
          label="Preço mínimo"
          id="minPrice"
          type="number"
          value={minPrice}
          onChange={(e) => onChangeMin(e.target.value)}
          placeholder="R$ 0,00"
          step="0.01"
          min="0"
        />
        <InputField
          label="Preço máximo"
          id="maxPrice"
          type="number"
          value={maxPrice}
          onChange={(e) => onChangeMax(e.target.value)}
          placeholder="R$ 0,00"
          step="0.01"
          min="0"
        />
        <InputField
          label="Ordenar por"
          id="orderBy"
          asSelect
          value={`${orderBy}-${order}`}
          onChange={(e) => onOrderChange(e.target.value)}
          options={[
            { value: 'createdAt-desc', label: 'Mais recentes' },
            { value: 'createdAt-asc', label: 'Mais antigos' },
            { value: 'nome-asc', label: 'Nome (A-Z)' },
            { value: 'nome-desc', label: 'Nome (Z-A)' },
            { value: 'preco-asc', label: 'Menor preço' },
            { value: 'preco-desc', label: 'Maior preço' }
          ]}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onClear}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  )
}
