import { BuildList } from "@/components/BuildList";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">PC Builder</h1>
        <p className="mt-2 text-zinc-400">
          Pick parts for your custom gaming PC, check compatibility, and see the total price.
        </p>
      </header>
      <BuildList />
      <footer className="mt-12 text-xs text-zinc-500">
        Prices are sample values for demonstration and are not live retailer prices.
      </footer>
    </main>
  );
}
