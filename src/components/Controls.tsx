const SPEED_OPTIONS = [
  { label: 'Bardzo szybko', ms: 60 },
  { label: 'Szybko', ms: 150 },
  { label: 'Normalnie', ms: 300 },
  { label: 'Wolno', ms: 600 },
  { label: 'Bardzo wolno', ms: 1000 },
]

type ControlsProps = {
  isPlaying: boolean
  onTogglePlay: () => void
  onStep: () => void
  onReset: () => void
  speedMs: number
  onSpeedChange: (ms: number) => void
  generation: number
}

export function Controls({
  isPlaying,
  onTogglePlay,
  onStep,
  onReset,
  speedMs,
  onSpeedChange,
  generation,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
      <button
        type="button"
        onClick={onTogglePlay}
        className="rounded-md bg-emerald-600 px-4 py-1.5 font-medium text-white hover:bg-emerald-500"
      >
        {isPlaying ? 'Pauza' : 'Start'}
      </button>

      <button
        type="button"
        onClick={onStep}
        disabled={isPlaying}
        className="rounded-md bg-slate-700 px-4 py-1.5 font-medium hover:bg-slate-600 disabled:opacity-50"
      >
        Krok
      </button>

      <button
        type="button"
        onClick={onReset}
        className="rounded-md bg-rose-700 px-4 py-1.5 font-medium text-white hover:bg-rose-600"
      >
        Reset
      </button>

      <label className="flex items-center gap-2">
        Prędkość
        <select
          className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-100"
          value={speedMs}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
        >
          {SPEED_OPTIONS.map((opt) => (
            <option key={opt.ms} value={opt.ms}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <span className="ml-auto text-slate-400">Generacja: {generation}</span>
    </div>
  )
}
