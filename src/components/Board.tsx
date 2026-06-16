import type { Grid } from '@/gameOfLife'

type BoardProps = {
  grid: Grid
  onCellClick?: (row: number, col: number) => void
  interactive: boolean
}

export function Board({ grid, onCellClick, interactive }: BoardProps) {
  const size = grid.length

  return (
    <div
      className="grid aspect-square w-full max-w-[min(80vh,80vw)] gap-px rounded-md bg-slate-700 p-px"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {grid.map((line, row) =>
        line.map((alive, col) => (
          <button
            key={`${row}-${col}`}
            type="button"
            disabled={!interactive}
            onClick={() => onCellClick?.(row, col)}
            aria-label={`komórka ${row + 1}, ${col + 1}, ${alive ? 'żywa' : 'martwa'}`}
            className={`aspect-square min-h-0 min-w-0 ${
              alive ? 'bg-emerald-400' : 'bg-slate-900'
            } ${interactive ? 'cursor-pointer hover:bg-emerald-600/50' : ''}`}
          />
        )),
      )}
    </div>
  )
}
