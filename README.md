# Semaphore (TypeScript + Node.js)

A small vanilla TypeScript Node.js project demonstrating a simple semaphore to limit concurrent async operations.

## Requirements

- Node.js 18+ (tested on newer versions)
- pnpm

## Setup

```bash
pnpm install
```

## Scripts

- `pnpm dev` - Run directly from TypeScript source with `tsx`
- `pnpm build` - Clean `dist` and compile TypeScript
- `pnpm start` - Run compiled JavaScript from `dist`

## Project Structure

- `src/index.ts` - Demo usage
- `src/lib/Semaphore/Semaphore.ts` - Semaphore implementation
- `src/lib/Semaphore/index.ts` - Barrel export

## Notes

- This repo enforces `pnpm` usage via a Cursor rule in `.cursor/rules/pnpm-only.mdc`.
