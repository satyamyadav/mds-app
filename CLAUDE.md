# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (Vite with HMR)
- **Build**: `npm run build` (runs `tsc -b && vite build`, output in `dist/`)
- **Lint**: `npm run lint` (ESLint 9 flat config)
- **Preview production build**: `npm run preview`

## Tech Stack

- React 19 + TypeScript 5.9 + Vite 8
- React Compiler enabled via `babel-plugin-react-compiler` (applied through `@rolldown/plugin-babel` in `vite.config.ts`)
- ESLint 9 flat config with typescript-eslint, react-hooks, and react-refresh plugins
- No test framework configured yet

## Architecture

Single-page React app bootstrapped from the Vite React+TS template. Entry point is `src/main.tsx` → `src/App.tsx`. Static assets live in `src/assets/` (imported by components) and `public/` (served as-is, referenced via absolute paths like `/icons.svg`).
