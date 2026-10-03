"use client";

import { useCallback, useState } from "react";
import { useBuild } from "@/lib/build-store";
import { categories } from "@/lib/categories";
import { checkCompatibility, estimateWattage, totalPrice } from "@/lib/compatibility";
import { formatPrice, partSpecs } from "@/lib/format";
import type { CategoryId } from "@/lib/types";
import { PartPicker } from "./PartPicker";

export function BuildList() {
  const { build, setPart, removePart, clear } = useBuild();
  const [picking, setPicking] = useState<CategoryId | null>(null);
  const [copied, setCopied] = useState(false);
  const closePicker = useCallback(() => setPicking(null), []);

  const issues = checkCompatibility(build);
  const errors = issues.filter((i) => i.level === "error");
  const total = totalPrice(build);
  const wattage = estimateWattage(build);
  const partCount = Object.keys(build).length;
  const pickingCategory = categories.find((c) => c.id === picking);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm">
        <div
          className={`flex-1 rounded-lg px-4 py-3 font-medium ${
            partCount === 0
              ? "bg-zinc-800 text-zinc-300"
              : errors.length
                ? "bg-red-950 text-red-200"
                : "bg-emerald-950 text-emerald-200"
          }`}
        >
          {partCount === 0
            ? "Start by choosing parts below."
            : errors.length
              ? `${errors.length} compatibility ${errors.length === 1 ? "problem" : "problems"} found`
              : "Compatibility: no issues found"}
        </div>
        <div className="rounded-lg bg-zinc-800 px-4 py-3">
          Estimated wattage: <span className="font-semibold tabular-nums">{wattage} W</span>
        </div>
        <div className="rounded-lg bg-zinc-800 px-4 py-3">
          Total: <span className="font-semibold tabular-nums">{formatPrice(total)}</span>
        </div>
      </div>

      {issues.length > 0 && (
        <ul className="space-y-2 text-sm">
          {issues.map((issue) => (
            <li
              key={issue.message}
              className={`rounded-lg border px-4 py-2 ${
                issue.level === "error"
                  ? "border-red-900 bg-red-950/50 text-red-200"
                  : "border-amber-900 bg-amber-950/50 text-amber-200"
              }`}
            >
              <span className="font-semibold">{issue.level === "error" ? "Problem: " : "Note: "}</span>
              {issue.message}
            </li>
          ))}
        </ul>
      )}

      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="px-4 py-3">Component</th>
              <th className="px-4 py-3">Selection</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="w-24 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {categories.map(({ id, label }) => {
              const part = build[id];
              return (
                <tr key={id} className="bg-zinc-950">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-zinc-300">{label}</td>
                  <td className="px-4 py-3">
                    {part ? (
                      <div>
                        <button onClick={() => setPicking(id)} className="text-left font-medium hover:text-emerald-400">
                          {part.name}
                        </button>
                        <div className="mt-0.5 text-xs text-zinc-400">{partSpecs(part).join(" · ")}</div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setPicking(id)}
                        className="rounded-md bg-emerald-600 px-3 py-1.5 font-medium text-white hover:bg-emerald-500"
                      >
                        + Choose a {label}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{part ? formatPrice(part.price) : ""}</td>
                  <td className="px-4 py-3 text-right">
                    {part && (
                      <button
                        onClick={() => removePart(id)}
                        className="text-zinc-500 hover:text-red-400"
                        aria-label={`Remove ${label}`}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-zinc-900">
            <tr>
              <td className="px-4 py-3 font-semibold" colSpan={2}>
                Total
              </td>
              <td className="px-4 py-3 text-right text-base font-semibold tabular-nums">{formatPrice(total)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex justify-end gap-3 text-sm">
        <button
          onClick={clear}
          disabled={partCount === 0}
          className="rounded-md border border-zinc-700 px-4 py-2 hover:bg-zinc-800 disabled:opacity-40"
        >
          Clear build
        </button>
        <button
          onClick={copyLink}
          disabled={partCount === 0}
          className="rounded-md bg-zinc-100 px-4 py-2 font-medium text-zinc-900 hover:bg-white disabled:opacity-40"
        >
          {copied ? "Link copied" : "Copy share link"}
        </button>
      </div>

      {pickingCategory && (
        <PartPicker
          category={pickingCategory.id}
          label={pickingCategory.label}
          build={build}
          onSelect={(partId) => {
            setPart(pickingCategory.id, partId);
            closePicker();
          }}
          onClose={closePicker}
        />
      )}
    </div>
  );
}
