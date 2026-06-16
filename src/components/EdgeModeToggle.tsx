import type { EdgeMode } from '@/gameOfLife'

type EdgeModeToggleProps = {
  value: EdgeMode
  onChange: (mode: EdgeMode) => void
  disabled?: boolean
}

export function EdgeModeToggle({
  value,
  onChange,
  disabled,
}: EdgeModeToggleProps) {
  const isTorus = value === 'torus'

  return (
    <label className="flex items-center gap-2 text-sm text-slate-200">
      Zawijanie krawędzi (torus)
      <button
        type="button"
        role="switch"
        aria-checked={isTorus}
        disabled={disabled}
        onClick={() => onChange(isTorus ? 'fixed' : 'torus')}
        className={`relative h-6 w-11 rounded-full transition-colors disabled:opacity-50 ${
          isTorus ? 'bg-emerald-500' : 'bg-slate-600'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            isTorus ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  )
}
