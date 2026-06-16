import { useCallback, useEffect, useRef, useState } from 'react'
import { Board } from '@/components/Board'
import { BoardSizeSelect } from '@/components/BoardSizeSelect'
import { Controls } from '@/components/Controls'
import { EdgeModeToggle } from '@/components/EdgeModeToggle'
import {
  createDefaultGrid,
  createRandomGrid,
  type EdgeMode,
  type Grid,
  hashGrid,
  nextGeneration,
  toggleCell,
} from '@/gameOfLife'

type Phase = 'setup' | 'simulating'

const DEFAULT_SIZE = 30

/**
 * How many past generation hashes to remember when looking for a repeating
 * state. Covers still lifes (cycle length 1) and the vast majority of small
 * oscillators (periods up to a few dozen generations).
 */
const STAGNATION_HISTORY_LENGTH = 32

export function App() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [size, setSize] = useState(DEFAULT_SIZE)
  const [edgeMode, setEdgeMode] = useState<EdgeMode>('fixed')
  const [grid, setGrid] = useState<Grid>(() => createDefaultGrid(DEFAULT_SIZE))
  const [isPlaying, setIsPlaying] = useState(false)
  const [speedMs, setSpeedMs] = useState(300)
  const [generation, setGeneration] = useState(0)
  const [autoRevive, setAutoRevive] = useState(true)
  const [reseedCount, setReseedCount] = useState(0)

  const stateHistoryRef = useRef<number[]>([])

  const resetStagnationHistory = useCallback(() => {
    stateHistoryRef.current = []
  }, [])

  const handleSizeChange = useCallback(
    (newSize: number) => {
      setSize(newSize)
      setGrid(createDefaultGrid(newSize))
      resetStagnationHistory()
    },
    [resetStagnationHistory],
  )

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
    setReseedCount(0)
    setGrid(createDefaultGrid(size))
    resetStagnationHistory()
  }, [size, resetStagnationHistory])

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

  /**
   * Stagnation watchdog: runs as a plain effect (not a setState updater) so
   * it executes exactly once per committed grid change, even under
   * StrictMode's double-invoke of updater functions. If the current grid's
   * hash already appeared in the recent history, the board has settled into
   * a still life or a short oscillator - reseed it with a fresh random soup.
   */
  useEffect(() => {
    if (phase !== 'simulating') return

    const hash = hashGrid(grid)
    const history = stateHistoryRef.current
    const hasStagnated = history.includes(hash)

    history.push(hash)
    if (history.length > STAGNATION_HISTORY_LENGTH) history.shift()

    if (hasStagnated && autoRevive) {
      resetStagnationHistory()
      setReseedCount((n) => n + 1)
      setGrid(createRandomGrid(size))
    }
  }, [grid, phase, autoRevive, size, resetStagnationHistory])

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">Conway's Game of Life</h1>

        {phase === 'setup' ? (
          <>
            <button
              type="button"
              onClick={handleStart}
              className="rounded-md bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-500"
            >
              Start game
            </button>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <BoardSizeSelect value={size} onChange={handleSizeChange} />
              <EdgeModeToggle value={edgeMode} onChange={setEdgeMode} />
            </div>

            <p className="text-center text-sm text-slate-400">
              The "Acorn" pattern is set by default — it lives for a very long
              time (over 5000 generations) before it stabilizes. You can change
              it by clicking cells to set your own starting layout of live
              cells, then press "Start game".
            </p>

            <Board grid={grid} onCellClick={handleCellClick} interactive />
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <span className="text-sm text-slate-400">
                Size: {size} x {size}
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
              autoRevive={autoRevive}
              onAutoReviveChange={setAutoRevive}
              reseedCount={reseedCount}
            />

            <Board grid={grid} interactive={false} />
          </>
        )}
      </div>
    </div>
  )
}
