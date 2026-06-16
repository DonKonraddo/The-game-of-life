export type Grid = boolean[][]
export type EdgeMode = 'fixed' | 'torus'

/** Tworzy puste (wszystkie martwe) kwadratowe pole gry o podanym rozmiarze. */
export function createEmptyGrid(size: number): Grid {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false),
  )
}

/**
 * Współrzędne (wiersz, kolumna) wzoru "Acorn" (żołądź) - jednego z najdłużej
 * żyjących małych wzorów ("metuzalemów"): stabilizuje się po 5206 generacjach.
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

/** Tworzy planszę z domyślnym wzorem startowym (Acorn) wycentrowanym na środku. */
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

/** Zwraca nową siatkę z odwróconym stanem jednej komórki (żywa <-> martwa). */
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

/** Liczy żywych sąsiadów komórki (row, col), z uwzględnieniem trybu krawędzi. */
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
 * Wyznacza następną generację zgodnie z regułami Conwaya:
 * - żywa komórka z 2 lub 3 żywymi sąsiadami przetrwa,
 * - żywa komórka z <2 lub >3 sąsiadami umiera,
 * - martwa komórka z dokładnie 3 żywymi sąsiadami ożywa.
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

/** Czy na planszy istnieje przynajmniej jedna żywa komórka. */
export function hasAnyAliveCell(grid: Grid): boolean {
  return grid.some((line) => line.some(Boolean))
}
