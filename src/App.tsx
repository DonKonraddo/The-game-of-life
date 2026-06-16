import { useCallback, useEffect, useRef, useState } from 'react'
import { Board } from '@/components/Board'
import { BoardSizeSelect } from '@/components/BoardSizeSelect'
import { Controls } from '@/components/Controls'
import { EdgeModeToggle } from '@/components/EdgeModeToggle'
import {
  createDefaultGrid,
  type EdgeMode,
  type Grid,
  nextGeneration,
  toggleCell,
} from '@/gameOfLife'

type Phase = 'setup' | 'simulating'

const DEFAULT_SIZE = 30

export function App() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [size, setSize] = useState(DEFAULT_SIZE)
  const [edgeMode, setEdgeMode] = useState<EdgeMode>('fixed')
  const [grid, setGrid] = useState<Grid>(() => createDefaultGrid(DEFAULT_SIZE))
  const [isPlaying, setIsPlaying] = useState(false)
  const [speedMs, setSpeedMs] = useState(300)
  const [generation, setGeneration] = useState(0)

  const handleSizeChange = useCallback((newSize: number) => {
    setSize(newSize)
    setGrid(createDefaultGrid(newSize))
  }, [])

  const handleCellClick = useCallback((row: number, col: number) => {
    setGrid((g) => toggleCell(g, row, col))
  }, [])

  const handleStart = useCallback(() => {
    setPhase('simulating')
    setIsPlaying(true)
  }, [])

  const handleStep = useCallback(() => {
    setGrid((g) => nextGeneration(g, edgeMode))
    setGeneration((n) => n + 1)
  }, [edgeMode])

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((p) => !p)
  }, [])

  const handleReset = useCallback(() => {
    setIsPlaying(false)
    setPhase('setup')
    setGeneration(0)
    setGrid(createDefaultGrid(size))
  }, [size])

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isPlaying) return

    intervalRef.current = setInterval(() => {
      setGrid((g) => nextGeneration(g, edgeMode))
      setGeneration((n) => n + 1)
    }, speedMs)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, speedMs, edgeMode])

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">
          Gra w Życie (Conway's Game of Life)
        </h1>

        {phase === 'setup' ? (
          <>
            <button
              type="button"
              onClick={handleStart}
              className="rounded-md bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-500"
            >
              Rozpocznij grę
            </button>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <BoardSizeSelect value={size} onChange={handleSizeChange} />
              <EdgeModeToggle value={edgeMode} onChange={setEdgeMode} />
            </div>

            <p className="text-center text-sm text-slate-400">
              Domyślnie ustawiony jest wzór „Acorn” (żołądź) — żyje bardzo długo
              (ponad 5000 generacji) zanim się stabilizuje. Możesz go zmienić,
              klikając komórki, aby ustawić własny początkowy układ żywych
              komórek, a następnie naciśnij „Rozpocznij grę”.
            </p>

            <Board grid={grid} onCellClick={handleCellClick} interactive />
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <span className="text-sm text-slate-400">
                Rozmiar: {size} x {size}
              </span>
              <EdgeModeToggle value={edgeMode} onChange={setEdgeMode} />
            </div>

            <Controls
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              onStep={handleStep}
              onReset={handleReset}
              speedMs={speedMs}
              onSpeedChange={setSpeedMs}
              generation={generation}
            />

            <Board grid={grid} interactive={false} />
          </>
        )}
      </div>
    </div>
  )
}
