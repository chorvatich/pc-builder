"use client";

import { useEffect, useMemo, useState } from "react";
import { partsInCategory } from "@/data/parts";
import { isCompatibleWith } from "@/lib/compatibility";
import { formatPrice, partSpecs } from "@/lib/format";
import type { Build, CategoryId } from "@/lib/types";

type SortKey = "price-asc" | "price-desc" | "name";

interface PartPickerProps {
  category: CategoryId;
  label: string;
  build: Build;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export function PartPicker({ category, label, build, onSelect, onClose }: PartPickerProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [compatibleOnly, setCompatibleOnly] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return partsInCategory(category)
      .map((part) => ({ part, compatible: isCompatibleWith(build, part) }))
      .filter(({ part, compatible }) => (!compatibleOnly || compatible) && part.name.toLowerCase().includes(q))
      .sort((a, b) =>
        sort === "name"
          ? a.part.name.localeCompare(b.part.name)
          : sort === "price-asc"
            ? a.part.price - b.part.price
            : b.part.price - a.part.price,
      );
  }, [category, build, query, sort, compatibleOnly]);

  const selectedId = build[category]?.id;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:p-10"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Choose a ${label}`}
        className="w-full max-w-4xl rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
          <h2 className="text-lg font-semibold">Choose a {label}</h2>
          <button onClick={onClose} className="rounded px-2 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-white" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-zinc-800 px-5 py-3 text-sm">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name"
            className="min-w-48 flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-emerald-500"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2"
            aria-label="Sort"
          >
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name</option>
          </select>
          <label className="flex items-center gap-2 text-zinc-300">
            <input type="checkbox" checked={compatibleOnly} onChange={(e) => setCompatibleOnly(e.target.checked)} className="accent-emerald-500" />
            Compatible only
          </label>
        </div>

        <ul className="divide-y divide-zinc-800">
          {options.length === 0 && (
            <li className="px-5 py-10 text-center text-zinc-400">No parts match. Try turning off &quot;Compatible only&quot;.</li>
          )}
          {options.map(({ part, compatible }) => (
            <li key={part.id} className="flex flex-wrap items-center gap-4 px-5 py-3">
              <div className="min-w-0 flex-1">
                <div className="font-medium">{part.name}</div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {partSpecs(part).map((spec) => (
                    <span key={spec} className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
                      {spec}
                    </span>
                  ))}
                  {!compatible && (
                    <span className="rounded bg-red-950 px-1.5 py-0.5 text-xs text-red-300">Incompatible</span>
                  )}
                </div>
              </div>
              <div className="w-24 text-right font-semibold tabular-nums">{formatPrice(part.price)}</div>
              <button
                onClick={() => onSelect(part.id)}
                disabled={part.id === selectedId}
                className="w-20 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:cursor-default disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                {part.id === selectedId ? "Added" : "Add"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
