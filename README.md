# PC Builder

Pick parts for a custom gaming PC, check that they work together, and see the total price — similar to PCPartPicker.

## Features

- One part per category: CPU, CPU cooler, motherboard, memory, storage, video card, case, power supply
- Compatibility checks: CPU socket, cooler socket, memory type and slot count, case form factor, GPU length, cooler height, radiator size, PSU wattage
- Estimated system wattage and running total price
- Builds are saved in the URL (shareable link) and in local storage

Prices in `src/data/parts.ts` are sample values, not live retailer prices.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS. No database or auth; the parts catalog is a static file.

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm test       # compatibility rule tests (Vitest)
npm run lint
npm run build
```

## Project layout

- `src/data/parts.ts` — parts catalog
- `src/lib/compatibility.ts` — compatibility rules, wattage, and totals
- `src/lib/build-store.ts` — build state synced to the URL and local storage
- `src/components/` — build list and part picker UI
