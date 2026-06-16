const SPEED_OPTIONS = [
  { label: 'Turbo', ms: 10 },
  { label: 'Very fast', ms: 60 },
  { label: 'Fast', ms: 150 },
  { label: 'Normal', ms: 300 },
  { label: 'Slow', ms: 600 },
  { label: 'Very slow', ms: 1000 },
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
        {isPlaying ? 'Pause' : 'Start'}
      </button>

      <button
        type="button"
        onClick={onStep}
        disabled={isPlaying}
        className="rounded-md bg-slate-700 px-4 py-1.5 font-medium hover:bg-slate-600 disabled:opacity-50"
      >
        Step
      </button>

      <button
        type="button"
        onClick={onReset}
        className="rounded-md bg-rose-700 px-4 py-1.5 font-medium text-white hover:bg-rose-600"
      >
        Reset
      </button>

      <label className="flex items-center gap-2">
        Speed
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

      <span className="ml-auto text-slate-400">Generation: {generation}</span>
    </div>
  )
}
