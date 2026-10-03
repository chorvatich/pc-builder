import type { Build, Part } from "./types";

export type IssueLevel = "error" | "warning";

export interface Issue {
  level: IssueLevel;
  message: string;
}

const BASE_SYSTEM_WATTS = 75;
const PSU_HEADROOM = 1.2;

export function estimateWattage(build: Build): number {
  return (
    BASE_SYSTEM_WATTS + (build.cpu?.tdpW ?? 0) + (build.gpu?.tdpW ?? 0)
  );
}

export function totalPrice(build: Build): number {
  return Object.values(build).reduce((sum, part) => sum + (part?.price ?? 0), 0);
}

export function checkCompatibility(build: Build): Issue[] {
  const issues: Issue[] = [];
  const { cpu, cooler, motherboard, memory, gpu, case: pcCase, psu } = build;

  if (cpu && motherboard && cpu.socket !== motherboard.socket) {
    issues.push({
      level: "error",
      message: `${cpu.name} uses socket ${cpu.socket}, but ${motherboard.name} has socket ${motherboard.socket}.`,
    });
  }

  if (cpu && cooler && !cooler.sockets.includes(cpu.socket)) {
    issues.push({
      level: "error",
      message: `${cooler.name} does not support socket ${cpu.socket}.`,
    });
  }

  if (memory && motherboard) {
    if (memory.type !== motherboard.memoryType) {
      issues.push({
        level: "error",
        message: `${memory.name} is ${memory.type}, but ${motherboard.name} requires ${motherboard.memoryType}.`,
      });
    }
    if (memory.modules > motherboard.memorySlots) {
      issues.push({
        level: "error",
        message: `${memory.name} has ${memory.modules} modules, but ${motherboard.name} only has ${motherboard.memorySlots} memory slots.`,
      });
    }
  }

  if (motherboard && pcCase && !pcCase.formFactors.includes(motherboard.formFactor)) {
    issues.push({
      level: "error",
      message: `${pcCase.name} does not fit a ${motherboard.formFactor} motherboard.`,
    });
  }

  if (gpu && pcCase && gpu.lengthMm > pcCase.maxGpuLengthMm) {
    issues.push({
      level: "error",
      message: `${gpu.name} is ${gpu.lengthMm} mm long, but ${pcCase.name} only fits video cards up to ${pcCase.maxGpuLengthMm} mm.`,
    });
  }

  if (cooler && pcCase) {
    if (cooler.heightMm && cooler.heightMm > pcCase.maxCoolerHeightMm) {
      issues.push({
        level: "error",
        message: `${cooler.name} is ${cooler.heightMm} mm tall, but ${pcCase.name} only fits CPU coolers up to ${pcCase.maxCoolerHeightMm} mm.`,
      });
    }
    if (cooler.radiatorMm && cooler.radiatorMm > pcCase.maxRadiatorMm) {
      issues.push({
        level: "error",
        message: `${cooler.name} has a ${cooler.radiatorMm} mm radiator, but ${pcCase.name} only supports radiators up to ${pcCase.maxRadiatorMm} mm.`,
      });
    }
  }

  if (psu && (cpu || gpu)) {
    const watts = estimateWattage(build);
    if (psu.wattage < watts) {
      issues.push({
        level: "error",
        message: `${psu.name} (${psu.wattage} W) is below the estimated system draw of ${watts} W.`,
      });
    } else if (psu.wattage < watts * PSU_HEADROOM) {
      issues.push({
        level: "warning",
        message: `${psu.name} (${psu.wattage} W) leaves little headroom over the estimated ${watts} W draw. Consider at least ${Math.ceil((watts * PSU_HEADROOM) / 50) * 50} W.`,
      });
    }
  }

  if (cpu && !cpu.integratedGraphics && !gpu) {
    issues.push({
      level: "warning",
      message: `${cpu.name} has no integrated graphics. Add a video card to get display output.`,
    });
  }

  return issues;
}

// A part is compatible if it introduces no errors beyond those the rest of the build already has.
export function isCompatibleWith(build: Build, part: Part): boolean {
  const rest: Build = { ...build };
  delete rest[part.category];
  const existing = new Set(
    checkCompatibility(rest).filter((i) => i.level === "error").map((i) => i.message),
  );
  return checkCompatibility({ ...rest, [part.category]: part }).every(
    (i) => i.level !== "error" || existing.has(i.message),
  );
}
