# Semaphore (TypeScript + Node.js)

A small vanilla TypeScript Node.js project demonstrating two semaphore patterns to limit concurrent async operations.

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

## What This Demonstrates

The project includes two implementations:

- `Semaphore2` (`acquire` / `release`) in `src/lib/Semaphore2/Semaphore.ts`
- `Semaphore` (`callFunction`) in `src/lib/Semaphore/Semaphore.ts`

Both are exercised in `src/index.ts` with `MAX_CONCURRENT_REQUESTS = 2` and 4 URL fetches.

## Important Semaphore2 Usage Note

When using `Semaphore2`, always pair `acquire()` with `release()` in a `finally` block:

```ts
await throttler.acquire();
try {
	return await getUrl(url);
} finally {
	throttler.release();
}
```

If `release()` is not called, queued tasks never get a permit and can remain blocked indefinitely.

## Project Structure

- `src/index.ts` - Runs Example 1 (`Semaphore2`) and Example 2 (`Semaphore`)
- `src/lib/Semaphore2/Semaphore.ts` - Permit-based semaphore (`acquire` / `release`)
- `src/lib/Semaphore2/index.ts` - Barrel export
- `src/lib/Semaphore/Semaphore.ts` - Queue-based wrapper (`callFunction`)
- `src/lib/Semaphore/index.ts` - Barrel export

## Notes

- This repo enforces `pnpm` usage via a Cursor rule in `.cursor/rules/pnpm-only.mdc`.
