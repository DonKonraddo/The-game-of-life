const SIZE_OPTIONS = Array.from({ length: 20 }, (_, i) => (i + 1) * 10)

type BoardSizeSelectProps = {
  value: number
  onChange: (size: number) => void
  disabled?: boolean
}

export function BoardSizeSelect({
  value,
  onChange,
  disabled,
}: BoardSizeSelectProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-200">
      Board size
      <select
        className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-100 disabled:opacity-50"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {SIZE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size} x {size}
          </option>
        ))}
      </select>
    </label>
  )
}
