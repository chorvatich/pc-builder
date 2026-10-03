import type { CategoryId } from "./types";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "cpu", label: "CPU" },
  { id: "cooler", label: "CPU Cooler" },
  { id: "motherboard", label: "Motherboard" },
  { id: "memory", label: "Memory" },
  { id: "storage", label: "Storage" },
  { id: "gpu", label: "Video Card" },
  { id: "case", label: "Case" },
  { id: "psu", label: "Power Supply" },
];

export const categoryIds = categories.map((c) => c.id);
