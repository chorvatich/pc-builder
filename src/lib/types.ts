export type CategoryId =
  | "cpu"
  | "cooler"
  | "motherboard"
  | "memory"
  | "storage"
  | "gpu"
  | "case"
  | "psu";

export type Socket = "AM5" | "LGA1700" | "LGA1851";
export type MemoryType = "DDR4" | "DDR5";
export type FormFactor = "ATX" | "Micro-ATX" | "Mini-ITX";

interface BasePart {
  id: string;
  name: string;
  price: number;
}

export interface Cpu extends BasePart {
  category: "cpu";
  socket: Socket;
  cores: number;
  threads: number;
  boostClockGHz: number;
  tdpW: number;
  integratedGraphics: boolean;
}

export interface Cooler extends BasePart {
  category: "cooler";
  type: "Air" | "Liquid";
  sockets: Socket[];
  heightMm?: number;
  radiatorMm?: number;
}

export interface Motherboard extends BasePart {
  category: "motherboard";
  socket: Socket;
  formFactor: FormFactor;
  memoryType: MemoryType;
  memorySlots: number;
  chipset: string;
}

export interface Memory extends BasePart {
  category: "memory";
  type: MemoryType;
  speedMTs: number;
  modules: number;
  capacityGB: number;
}

export interface Storage extends BasePart {
  category: "storage";
  type: "NVMe SSD" | "SATA SSD" | "HDD";
  capacityGB: number;
}

export interface Gpu extends BasePart {
  category: "gpu";
  chipset: string;
  vramGB: number;
  tdpW: number;
  lengthMm: number;
}

export interface Case extends BasePart {
  category: "case";
  formFactors: FormFactor[];
  maxGpuLengthMm: number;
  maxCoolerHeightMm: number;
  maxRadiatorMm: number;
}

export interface Psu extends BasePart {
  category: "psu";
  wattage: number;
  efficiency: string;
  modular: "Full" | "Semi" | "No";
}

export type Part =
  | Cpu
  | Cooler
  | Motherboard
  | Memory
  | Storage
  | Gpu
  | Case
  | Psu;

export type PartOf<C extends CategoryId> = Extract<Part, { category: C }>;

export type Build = { [C in CategoryId]?: PartOf<C> };
