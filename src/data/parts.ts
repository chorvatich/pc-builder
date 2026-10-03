import type { CategoryId, Part, PartOf } from "@/lib/types";

// Sample catalog with approximate US retail prices. Not live pricing.
export const parts: Part[] = [
  // CPUs
  { category: "cpu", id: "ryzen-5-7600x", name: "AMD Ryzen 5 7600X", price: 199, socket: "AM5", cores: 6, threads: 12, boostClockGHz: 5.3, tdpW: 105, integratedGraphics: true },
  { category: "cpu", id: "ryzen-7-9700x", name: "AMD Ryzen 7 9700X", price: 299, socket: "AM5", cores: 8, threads: 16, boostClockGHz: 5.5, tdpW: 65, integratedGraphics: true },
  { category: "cpu", id: "ryzen-7-7800x3d", name: "AMD Ryzen 7 7800X3D", price: 399, socket: "AM5", cores: 8, threads: 16, boostClockGHz: 5.0, tdpW: 120, integratedGraphics: true },
  { category: "cpu", id: "ryzen-7-9800x3d", name: "AMD Ryzen 7 9800X3D", price: 479, socket: "AM5", cores: 8, threads: 16, boostClockGHz: 5.2, tdpW: 120, integratedGraphics: true },
  { category: "cpu", id: "ryzen-9-9950x", name: "AMD Ryzen 9 9950X", price: 549, socket: "AM5", cores: 16, threads: 32, boostClockGHz: 5.7, tdpW: 170, integratedGraphics: true },
  { category: "cpu", id: "core-i5-14400f", name: "Intel Core i5-14400F", price: 129, socket: "LGA1700", cores: 10, threads: 16, boostClockGHz: 4.7, tdpW: 65, integratedGraphics: false },
  { category: "cpu", id: "core-i5-14600k", name: "Intel Core i5-14600K", price: 229, socket: "LGA1700", cores: 14, threads: 20, boostClockGHz: 5.3, tdpW: 125, integratedGraphics: true },
  { category: "cpu", id: "core-i7-14700k", name: "Intel Core i7-14700K", price: 329, socket: "LGA1700", cores: 20, threads: 28, boostClockGHz: 5.6, tdpW: 125, integratedGraphics: true },
  { category: "cpu", id: "core-ultra-7-265k", name: "Intel Core Ultra 7 265K", price: 279, socket: "LGA1851", cores: 20, threads: 20, boostClockGHz: 5.5, tdpW: 125, integratedGraphics: true },

  // CPU coolers
  { category: "cooler", id: "hyper-212-black", name: "Cooler Master Hyper 212 Black", price: 30, type: "Air", sockets: ["AM5", "LGA1700", "LGA1851"], heightMm: 159 },
  { category: "cooler", id: "peerless-assassin-120-se", name: "Thermalright Peerless Assassin 120 SE", price: 35, type: "Air", sockets: ["AM5", "LGA1700", "LGA1851"], heightMm: 155 },
  { category: "cooler", id: "nh-l9a-am5", name: "Noctua NH-L9a-AM5 (Low Profile)", price: 55, type: "Air", sockets: ["AM5"], heightMm: 37 },
  { category: "cooler", id: "nh-d15-g2", name: "Noctua NH-D15 G2", price: 149, type: "Air", sockets: ["AM5", "LGA1700", "LGA1851"], heightMm: 168 },
  { category: "cooler", id: "kraken-240", name: "NZXT Kraken 240", price: 129, type: "Liquid", sockets: ["AM5", "LGA1700", "LGA1851"], radiatorMm: 240 },
  { category: "cooler", id: "liquid-freezer-iii-360", name: "ARCTIC Liquid Freezer III 360", price: 99, type: "Liquid", sockets: ["AM5", "LGA1700", "LGA1851"], radiatorMm: 360 },

  // Motherboards
  { category: "motherboard", id: "b650m-ds3h", name: "Gigabyte B650M DS3H", price: 129, socket: "AM5", formFactor: "Micro-ATX", memoryType: "DDR5", memorySlots: 4, chipset: "B650" },
  { category: "motherboard", id: "b650-tomahawk", name: "MSI MAG B650 Tomahawk WiFi", price: 199, socket: "AM5", formFactor: "ATX", memoryType: "DDR5", memorySlots: 4, chipset: "B650" },
  { category: "motherboard", id: "strix-b650e-i", name: "ASUS ROG Strix B650E-I Gaming WiFi", price: 289, socket: "AM5", formFactor: "Mini-ITX", memoryType: "DDR5", memorySlots: 2, chipset: "B650E" },
  { category: "motherboard", id: "strix-x670e-e", name: "ASUS ROG Strix X670E-E Gaming WiFi", price: 449, socket: "AM5", formFactor: "ATX", memoryType: "DDR5", memorySlots: 4, chipset: "X670E" },
  { category: "motherboard", id: "pro-b760-p-ddr4", name: "MSI PRO B760-P WiFi DDR4", price: 139, socket: "LGA1700", formFactor: "ATX", memoryType: "DDR4", memorySlots: 4, chipset: "B760" },
  { category: "motherboard", id: "b760m-gaming-x-ax", name: "Gigabyte B760M Gaming X AX", price: 159, socket: "LGA1700", formFactor: "Micro-ATX", memoryType: "DDR5", memorySlots: 4, chipset: "B760" },
  { category: "motherboard", id: "tuf-z790-plus", name: "ASUS TUF Gaming Z790-Plus WiFi", price: 229, socket: "LGA1700", formFactor: "ATX", memoryType: "DDR5", memorySlots: 4, chipset: "Z790" },
  { category: "motherboard", id: "pro-z890-a", name: "MSI PRO Z890-A WiFi", price: 229, socket: "LGA1851", formFactor: "ATX", memoryType: "DDR5", memorySlots: 4, chipset: "Z890" },

  // Memory
  { category: "memory", id: "ripjaws-v-16-ddr4", name: "G.Skill Ripjaws V 16GB (2x8GB) DDR4-3600", price: 39, type: "DDR4", speedMTs: 3600, modules: 2, capacityGB: 16 },
  { category: "memory", id: "vengeance-lpx-32-ddr4", name: "Corsair Vengeance LPX 32GB (2x16GB) DDR4-3200", price: 64, type: "DDR4", speedMTs: 3200, modules: 2, capacityGB: 32 },
  { category: "memory", id: "fury-beast-16-ddr5", name: "Kingston FURY Beast 16GB (2x8GB) DDR5-5200", price: 54, type: "DDR5", speedMTs: 5200, modules: 2, capacityGB: 16 },
  { category: "memory", id: "vengeance-32-ddr5", name: "Corsair Vengeance 32GB (2x16GB) DDR5-6000 CL30", price: 99, type: "DDR5", speedMTs: 6000, modules: 2, capacityGB: 32 },
  { category: "memory", id: "tforce-delta-32-ddr5", name: "TeamGroup T-Force Delta RGB 32GB (2x16GB) DDR5-6400", price: 109, type: "DDR5", speedMTs: 6400, modules: 2, capacityGB: 32 },
  { category: "memory", id: "trident-z5-64-ddr5", name: "G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5-6000 CL30", price: 199, type: "DDR5", speedMTs: 6000, modules: 2, capacityGB: 64 },
  { category: "memory", id: "vengeance-128-ddr5", name: "Corsair Vengeance 128GB (4x32GB) DDR5-5600", price: 349, type: "DDR5", speedMTs: 5600, modules: 4, capacityGB: 128 },

  // Storage
  { category: "storage", id: "crucial-p3-plus-1tb", name: "Crucial P3 Plus 1TB", price: 59, type: "NVMe SSD", capacityGB: 1000 },
  { category: "storage", id: "sn850x-1tb", name: "WD Black SN850X 1TB", price: 79, type: "NVMe SSD", capacityGB: 1000 },
  { category: "storage", id: "990-pro-2tb", name: "Samsung 990 Pro 2TB", price: 169, type: "NVMe SSD", capacityGB: 2000 },
  { category: "storage", id: "crucial-t705-2tb", name: "Crucial T705 2TB (PCIe 5.0)", price: 249, type: "NVMe SSD", capacityGB: 2000 },
  { category: "storage", id: "870-evo-1tb", name: "Samsung 870 EVO 1TB", price: 89, type: "SATA SSD", capacityGB: 1000 },
  { category: "storage", id: "barracuda-4tb", name: "Seagate BarraCuda 4TB", price: 79, type: "HDD", capacityGB: 4000 },

  // GPUs
  { category: "gpu", id: "arc-b580", name: "Intel Arc B580 Limited Edition", price: 249, chipset: "Arc B580", vramGB: 12, tdpW: 190, lengthMm: 272 },
  { category: "gpu", id: "rx-9060-xt-16", name: "Sapphire Pulse Radeon RX 9060 XT 16GB", price: 349, chipset: "Radeon RX 9060 XT", vramGB: 16, tdpW: 160, lengthMm: 240 },
  { category: "gpu", id: "rtx-5060-ti-16", name: "MSI GeForce RTX 5060 Ti 16G Ventus 2X", price: 429, chipset: "GeForce RTX 5060 Ti", vramGB: 16, tdpW: 180, lengthMm: 197 },
  { category: "gpu", id: "rtx-5070-fe", name: "NVIDIA GeForce RTX 5070 Founders Edition", price: 549, chipset: "GeForce RTX 5070", vramGB: 12, tdpW: 250, lengthMm: 242 },
  { category: "gpu", id: "rx-9070-xt", name: "Sapphire Pulse Radeon RX 9070 XT", price: 599, chipset: "Radeon RX 9070 XT", vramGB: 16, tdpW: 304, lengthMm: 320 },
  { category: "gpu", id: "rtx-5070-ti-tuf", name: "ASUS TUF Gaming GeForce RTX 5070 Ti", price: 799, chipset: "GeForce RTX 5070 Ti", vramGB: 16, tdpW: 300, lengthMm: 348 },
  { category: "gpu", id: "rtx-5080-fe", name: "NVIDIA GeForce RTX 5080 Founders Edition", price: 999, chipset: "GeForce RTX 5080", vramGB: 16, tdpW: 360, lengthMm: 304 },
  { category: "gpu", id: "rtx-5090-fe", name: "NVIDIA GeForce RTX 5090 Founders Edition", price: 1999, chipset: "GeForce RTX 5090", vramGB: 32, tdpW: 575, lengthMm: 304 },

  // Cases
  { category: "case", id: "montech-air-100", name: "Montech AIR 100 ARGB", price: 69, formFactors: ["Micro-ATX", "Mini-ITX"], maxGpuLengthMm: 330, maxCoolerHeightMm: 161, maxRadiatorMm: 240 },
  { category: "case", id: "nr200p", name: "Cooler Master MasterBox NR200P", price: 99, formFactors: ["Mini-ITX"], maxGpuLengthMm: 330, maxCoolerHeightMm: 155, maxRadiatorMm: 280 },
  { category: "case", id: "h5-flow", name: "NZXT H5 Flow", price: 94, formFactors: ["ATX", "Micro-ATX", "Mini-ITX"], maxGpuLengthMm: 365, maxCoolerHeightMm: 165, maxRadiatorMm: 360 },
  { category: "case", id: "4000d-airflow", name: "Corsair 4000D Airflow", price: 104, formFactors: ["ATX", "Micro-ATX", "Mini-ITX"], maxGpuLengthMm: 360, maxCoolerHeightMm: 170, maxRadiatorMm: 360 },
  { category: "case", id: "fractal-north", name: "Fractal Design North", price: 139, formFactors: ["ATX", "Micro-ATX", "Mini-ITX"], maxGpuLengthMm: 355, maxCoolerHeightMm: 170, maxRadiatorMm: 360 },
  { category: "case", id: "o11-dynamic-evo", name: "Lian Li O11 Dynamic EVO", price: 159, formFactors: ["ATX", "Micro-ATX", "Mini-ITX"], maxGpuLengthMm: 422, maxCoolerHeightMm: 167, maxRadiatorMm: 360 },

  // Power supplies
  { category: "psu", id: "mag-a650bn", name: "MSI MAG A650BN 650W", price: 59, wattage: 650, efficiency: "80+ Bronze", modular: "No" },
  { category: "psu", id: "focus-gx-750", name: "Seasonic FOCUS GX-750 750W", price: 109, wattage: 750, efficiency: "80+ Gold", modular: "Full" },
  { category: "psu", id: "rm850x", name: "Corsair RM850x 850W", price: 129, wattage: 850, efficiency: "80+ Gold", modular: "Full" },
  { category: "psu", id: "rm1000x", name: "Corsair RM1000x 1000W", price: 179, wattage: 1000, efficiency: "80+ Gold", modular: "Full" },
  { category: "psu", id: "dark-power-13-1000", name: "be quiet! Dark Power 13 1000W", price: 279, wattage: 1000, efficiency: "80+ Titanium", modular: "Full" },
  { category: "psu", id: "rog-thor-1200", name: "ASUS ROG Thor 1200W Platinum II", price: 329, wattage: 1200, efficiency: "80+ Platinum", modular: "Full" },
];

export function partsInCategory<C extends CategoryId>(category: C): PartOf<C>[] {
  return parts.filter((p): p is PartOf<C> => p.category === category);
}

export function findPart<C extends CategoryId>(
  category: C,
  id: string,
): PartOf<C> | undefined {
  return partsInCategory(category).find((p) => p.id === id);
}
