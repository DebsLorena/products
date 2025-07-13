'use client'

interface InputFieldProps {
  label: string
  id: string
  name?: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  placeholder?: string
  step?: string
  min?: string
  asSelect?: boolean
  options?: { value: string; label: string }[]
  className?: string
}

export default function InputField({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  step,
  min,
  asSelect = false,
  options = [],
  className = "w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {asSelect ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={className}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          step={step}
          min={min}
          className={className}
        />
      )}
    </div>
  )
}

