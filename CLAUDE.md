# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Task               | Command          |
| ------------------ | ---------------- |
| Dev server         | `pnpm dev`       |
| Type-check + build | `pnpm build`     |
| Preview build      | `pnpm preview`   |
| Format code        | `pnpm fmt`       |
| Check formatting   | `pnpm fmt:check` |

No test framework or linter is configured. Formatting is handled by **oxfmt** (not Prettier).

## Architecture

**Stack:** React 19 + TanStack Router (file-based) + Vite 8 + TypeScript 6

**Routing:** Routes live in `src/routes/` using `createFileRoute('/path')`. The root layout is `__root.tsx`. Route tree is auto-generated into `src/routeTree.gen.ts` — never edit it manually.

**Path alias:** `@/` maps to `src/`.

**React Compiler** is enabled via Babel. Do not use manual memoization (`useCallback`, `useMemo`, `React.memo`) — the compiler handles it automatically.

**Plugin order in vite.config.ts matters:** `tanstackRouter` must come before `react`.

## Communication

- Documentation and code comments: always in English
- If the human writes in Chinese, respond in Chinese

## Conventions

- Functional components only
- Use `type` keyword for type imports (`verbatimModuleSyntax` is on)
- Single quotes, sorted imports (enforced by oxfmt)
- Static data in `src/data/` with exported TypeScript interfaces
- Feature documentation in `docs/feat/`
- Inline styles pattern (styles object at bottom of component file)
