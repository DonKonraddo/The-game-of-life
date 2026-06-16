export type Grid = boolean[][]
export type EdgeMode = 'fixed' | 'torus'

/** Creates an empty (all dead) square grid of the given size. */
export function createEmptyGrid(size: number): Grid {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false),
  )
}

/**
 * Coordinates (row, col) of the "Acorn" pattern - one of the longest-living
 * small patterns ("methuselahs"): stabilizes after 5206 generations.
 *   .#.....
 *   ...#...
 *   ##..###
 */
const ACORN_PATTERN: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 3],
  [2, 0],
  [2, 1],
  [2, 4],
  [2, 5],
  [2, 6],
]

/** Creates a grid with the default starting pattern (Acorn) centered on it. */
export function createDefaultGrid(size: number): Grid {
  const grid = createEmptyGrid(size)
  const offsetRow = Math.floor(size / 2) - 1
  const offsetCol = Math.floor(size / 2) - 3

  for (const [dr, dc] of ACORN_PATTERN) {
    const r = offsetRow + dr
    const c = offsetCol + dc
    if (r >= 0 && r < size && c >= 0 && c < size) {
      grid[r][c] = true
    }
  }

  return grid
}

/** Returns a new grid with a single cell's state flipped (alive <-> dead). */
export function toggleCell(grid: Grid, row: number, col: number): Grid {
  return grid.map((line, r) =>
    r === row ? line.map((cell, c) => (c === col ? !cell : cell)) : line,
  )
}

const NEIGHBOR_OFFSETS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const

/** Counts the alive neighbours of cell (row, col), respecting the edge mode. */
export function countAliveNeighbors(
  grid: Grid,
  row: number,
  col: number,
  edgeMode: EdgeMode,
): number {
  const size = grid.length
  let count = 0

  for (const [dr, dc] of NEIGHBOR_OFFSETS) {
    let r = row + dr
    let c = col + dc

    if (edgeMode === 'torus') {
      r = (r + size) % size
      c = (c + size) % size
    } else if (r < 0 || r >= size || c < 0 || c >= size) {
      continue
    }

    if (grid[r][c]) count++
  }

  return count
}

/**
 * Computes the next generation according to Conway's rules:
 * - a live cell with 2 or 3 live neighbours survives,
 * - a live cell with <2 or >3 neighbours dies,
 * - a dead cell with exactly 3 live neighbours is born.
 */
export function nextGeneration(grid: Grid, edgeMode: EdgeMode): Grid {
  return grid.map((line, row) =>
    line.map((alive, col) => {
      const neighbors = countAliveNeighbors(grid, row, col, edgeMode)
      if (alive) return neighbors === 2 || neighbors === 3
      return neighbors === 3
    }),
  )
}

/** Whether the grid contains at least one alive cell. */
export function hasAnyAliveCell(grid: Grid): boolean {
  return grid.some((line) => line.some(Boolean))
}

const FNV_OFFSET_BASIS = 0x811c9dc5
const FNV_PRIME = 0x01000193

/**
 * Computes a fast 32-bit hash of the grid's state (FNV-1a over the alive/dead
 * bits). Used to detect still lifes and oscillators: if the same hash
 * reappears after N generations, the board has settled into a cycle of
 * length N (N = 1 means a still life - the state stopped changing at all).
 */
export function hashGrid(grid: Grid): number {
  let hash = FNV_OFFSET_BASIS
  for (const line of grid) {
    for (const alive of line) {
      hash ^= alive ? 1 : 0
      hash = Math.imul(hash, FNV_PRIME)
    }
  }
  return hash >>> 0
}

/** Creates a square grid randomly filled with live cells at the given density (0-1). */
export function createRandomGrid(size: number, density = 0.25): Grid {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Math.random() < density),
  )
}
