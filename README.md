# Gra w Życie (Conway's Game of Life)

Implementacja klasycznej **Gry w Życie** Johna Conwaya w React + TypeScript + Tailwind CSS + Vite.

## Zasady gry

Planszą jest siatka komórek, każda **żywa** lub **martwa**. Każda komórka ma 8 sąsiadów
(sąsiedztwo Moore'a). W każdej generacji (kroku) wszystkie komórki aktualizują się
równocześnie na podstawie stanu poprzedniej generacji, według reguł:

1. Żywa komórka z **2 lub 3** żywymi sąsiadami **przetrwa**.
2. Żywa komórka z **mniej niż 2** sąsiadami **umiera** (samotność).
3. Żywa komórka z **więcej niż 3** sąsiadami **umiera** (przegęszczenie).
4. Martwa komórka z **dokładnie 3** żywymi sąsiadami **rodzi się**.

## Funkcje

- Wybór rozmiaru planszy przed sesją — 20 wariantów, od 10×10 do 200×200.
- Tryb krawędzi: **stałe granice** (komórki poza planszą są martwe) lub **zawijanie**
  (plansza toroidalna — krawędzie się łączą).
- Domyślny wzór startowy: **Acorn** (żołądź) — jeden z najdłużej żyjących małych wzorów
  ("metuzalemów"), stabilizuje się po ponad 5000 generacjach.
- Ręczne ustawianie komórek przed startem (klikanie planszy).
- Sterowanie symulacją: Start/Pauza, Krok, Reset.
- Regulacja prędkości animacji (5 poziomów).
- Licznik aktualnej generacji.

## Wymagania

- Node.js 18+

## Instalacja

```bash
npm install
```

## Uruchomienie w trybie deweloperskim

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem wskazanym w terminalu (domyślnie `http://localhost:5173`).

## Build produkcyjny

```bash
npm run build
npm run preview
```

## Lintowanie i formatowanie

Projekt używa [Biome.js](https://biomejs.dev) do lintingu, formatowania i sortowania importów.

```bash
npm run lint        # sprawdzenie
npm run lint:fix     # automatyczna naprawa
npm run format       # tylko formatowanie
```

## Struktura projektu

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
(skonfigurowany w `tsconfig.app.json` i `vite.config.ts`).

## Technologie

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Biome.js](https://biomejs.dev/)
