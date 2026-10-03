import type { Part } from "./types";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatPrice(value: number): string {
  return usd.format(value);
}

function formatCapacity(gb: number): string {
  return gb >= 1000 ? `${gb / 1000} TB` : `${gb} GB`;
}

export function partSpecs(part: Part): string[] {
  switch (part.category) {
    case "cpu":
      return [
        part.socket,
        `${part.cores}C / ${part.threads}T`,
        `${part.boostClockGHz} GHz boost`,
        `${part.tdpW} W`,
        part.integratedGraphics ? "iGPU" : "No iGPU",
      ];
    case "cooler":
      return [
        part.type,
        part.radiatorMm ? `${part.radiatorMm} mm radiator` : `${part.heightMm} mm tall`,
        part.sockets.join(", "),
      ];
    case "motherboard":
      return [part.socket, part.chipset, part.formFactor, part.memoryType, `${part.memorySlots} RAM slots`];
    case "memory":
      return [part.type, `${part.speedMTs} MT/s`, `${part.modules} x ${part.capacityGB / part.modules} GB`];
    case "storage":
      return [part.type, formatCapacity(part.capacityGB)];
    case "gpu":
      return [part.chipset, `${part.vramGB} GB`, `${part.tdpW} W`, `${part.lengthMm} mm`];
    case "case":
      return [
        part.formFactors.join(" / "),
        `GPU ≤ ${part.maxGpuLengthMm} mm`,
        `Cooler ≤ ${part.maxCoolerHeightMm} mm`,
        `Radiator ≤ ${part.maxRadiatorMm} mm`,
      ];
    case "psu":
      return [`${part.wattage} W`, part.efficiency, `${part.modular === "No" ? "Non" : part.modular}-modular`];
  }
}
