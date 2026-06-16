# Gra w Życie (Conway's Game of Life)

[Polski](#gra-w-życie-conways-game-of-life-pl) | [English](#conways-game-of-life-en)

---

<a id="gra-w-życie-conways-game-of-life-pl"></a>
## 🇵🇱 Polski

Implementacja klasycznej **Gry w Życie** Johna Conwaya w React + TypeScript + Tailwind CSS + Vite.

### Zasady gry

Planszą jest siatka komórek, każda **żywa** lub **martwa**. Każda komórka ma 8 sąsiadów
(sąsiedztwo Moore'a). W każdej generacji (kroku) wszystkie komórki aktualizują się
równocześnie na podstawie stanu poprzedniej generacji, według reguł:

1. Żywa komórka z **2 lub 3** żywymi sąsiadami **przetrwa**.
2. Żywa komórka z **mniej niż 2** sąsiadami **umiera** (samotność).
3. Żywa komórka z **więcej niż 3** sąsiadami **umiera** (przegęszczenie).
4. Martwa komórka z **dokładnie 3** żywymi sąsiadami **rodzi się**.

### Funkcje

- Wybór rozmiaru planszy przed sesją — 20 wariantów, od 10×10 do 200×200.
- Tryb krawędzi: **stałe granice** (komórki poza planszą są martwe) lub **zawijanie**
  (plansza toroidalna — krawędzie się łączą).
- Domyślny wzór startowy: **Acorn** (żołądź) — jeden z najdłużej żyjących małych wzorów
  ("metuzalemów"), stabilizuje się po ponad 5000 generacjach.
- Ręczne ustawianie komórek przed startem (klikanie planszy).
- Sterowanie symulacją: Start/Pauza, Krok, Reset.
- Regulacja prędkości animacji (5 poziomów).
- Licznik aktualnej generacji.

### Wymagania

- Node.js 18+

### Instalacja

```bash
npm install
```

### Uruchomienie w trybie deweloperskim

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem wskazanym w terminalu (domyślnie `http://localhost:5173`).

### Build produkcyjny

```bash
npm run build
npm run preview
```

### Lintowanie i formatowanie

Projekt używa [Biome.js](https://biomejs.dev) do lintingu, formatowania i sortowania importów.

```bash
npm run lint        # sprawdzenie
npm run lint:fix     # automatyczna naprawa
npm run format       # tylko formatowanie
```

### Struktura projektu

```
src/
├── App.tsx                       # główny komponent, stan gry i sterowanie symulacją
├── gameOfLife.ts                  # logika gry (reguły Conwaya, generowanie planszy)
├── main.tsx                       # punkt wejścia aplikacji
├── index.css                      # style globalne (Tailwind)
└── components/
    ├── Board.tsx                  # renderowanie planszy/siatki komórek
    ├── BoardSizeSelect.tsx         # wybór rozmiaru planszy
    ├── Controls.tsx                # sterowanie symulacją (start/pauza/krok/reset/prędkość)
    └── EdgeModeToggle.tsx           # przełącznik trybu krawędzi (stałe/torus)
```

Importy w projekcie są **absolutne**, oparte o alias `@/` wskazujący na katalog `src/`
(skonfigurowany w `tsconfig.app.json` i `vite.config.ts`). Komponenty eksportowane są
jako **named exports** (bez `export default`).

### Technologie

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Biome.js](https://biomejs.dev/)

---

<a id="conways-game-of-life-en"></a>
## 🇬🇧 English

An implementation of John Conway's classic **Game of Life** using React + TypeScript +
Tailwind CSS + Vite.

### Rules

The board is a grid of cells, each either **alive** or **dead**. Each cell has 8 neighbours
(Moore neighbourhood). In every generation (step), all cells update simultaneously based on
the previous generation's state, following these rules:

1. A live cell with **2 or 3** live neighbours **survives**.
2. A live cell with **fewer than 2** neighbours **dies** (underpopulation).
3. A live cell with **more than 3** neighbours **dies** (overpopulation).
4. A dead cell with **exactly 3** live neighbours **is born**.

### Features

- Board size selection before each session — 20 options, from 10×10 to 200×200.
- Edge mode: **fixed boundaries** (cells outside the grid are dead) or **wrap-around**
  (toroidal board — edges connect to each other).
- Default starting pattern: **Acorn** — one of the longest-living small patterns
  ("methuselahs"), stabilizing after more than 5000 generations.
- Manually set cells before starting (click on the board).
- Simulation controls: Start/Pause, Step, Reset.
- Animation speed control (5 levels).
- Current generation counter.

### Requirements

- Node.js 18+

### Installation

```bash
npm install
```

### Running in development mode

```bash
npm run dev
```

The app will be available at the address shown in the terminal (default `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

### Linting and formatting

The project uses [Biome.js](https://biomejs.dev) for linting, formatting, and import sorting.

```bash
npm run lint        # check
npm run lint:fix     # auto-fix
npm run format       # formatting only
```

### Project structure

```
src/
├── App.tsx                       # main component, game state and simulation control
├── gameOfLife.ts                  # game logic (Conway's rules, grid generation)
├── main.tsx                       # application entry point
├── index.css                      # global styles (Tailwind)
└── components/
    ├── Board.tsx                  # board/cell grid rendering
    ├── BoardSizeSelect.tsx         # board size selection
    ├── Controls.tsx                # simulation controls (start/pause/step/reset/speed)
    └── EdgeModeToggle.tsx           # edge mode toggle (fixed/torus)
```

Imports in the project are **absolute**, based on the `@/` alias pointing to the `src/`
directory (configured in `tsconfig.app.json` and `vite.config.ts`). Components are exported
as **named exports** (no `export default`).

### Tech stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Biome.js](https://biomejs.dev/)
