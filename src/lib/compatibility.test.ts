import { describe, expect, it } from "vitest";
import { findPart } from "@/data/parts";
import { checkCompatibility, estimateWattage, isCompatibleWith, totalPrice } from "./compatibility";
import type { Build, CategoryId, PartOf } from "./types";

function part<C extends CategoryId>(category: C, id: string): PartOf<C> {
  const p = findPart(category, id);
  if (!p) throw new Error(`Missing part ${category}/${id}`);
  return p;
}

const goodBuild: Build = {
  cpu: part("cpu", "ryzen-7-9800x3d"),
  cooler: part("cooler", "peerless-assassin-120-se"),
  motherboard: part("motherboard", "b650-tomahawk"),
  memory: part("memory", "vengeance-32-ddr5"),
  storage: part("storage", "990-pro-2tb"),
  gpu: part("gpu", "rtx-5070-fe"),
  case: part("case", "4000d-airflow"),
  psu: part("psu", "rm850x"),
};

const messages = (build: Build) => checkCompatibility(build).map((i) => i.message);

describe("checkCompatibility", () => {
  it("accepts a compatible build", () => {
    expect(checkCompatibility(goodBuild)).toEqual([]);
  });

  it("flags CPU and motherboard socket mismatch", () => {
    expect(messages({ ...goodBuild, cpu: part("cpu", "core-i7-14700k") }).join()).toMatch(/socket LGA1700/);
  });

  it("flags memory type mismatch", () => {
    expect(messages({ ...goodBuild, memory: part("memory", "vengeance-lpx-32-ddr4") }).join()).toMatch(/requires DDR5/);
  });

  it("flags too many memory modules", () => {
    const build = { ...goodBuild, motherboard: part("motherboard", "strix-b650e-i"), memory: part("memory", "vengeance-128-ddr5") };
    expect(messages(build).join()).toMatch(/only has 2 memory slots/);
  });

  it("flags case form factor, GPU length, and cooler height", () => {
    const build = { ...goodBuild, case: part("case", "nr200p"), gpu: part("gpu", "rtx-5070-ti-tuf"), cooler: part("cooler", "nh-d15-g2") };
    const text = messages(build).join();
    expect(text).toMatch(/does not fit a ATX motherboard/);
    expect(text).toMatch(/video cards up to 330 mm/);
    expect(text).toMatch(/CPU coolers up to 155 mm/);
  });

  it("flags an undersized power supply", () => {
    const build = { ...goodBuild, gpu: part("gpu", "rtx-5090-fe"), psu: part("psu", "mag-a650bn") };
    expect(checkCompatibility(build)[0]).toMatchObject({ level: "error" });
  });

  it("warns when a CPU without graphics has no video card", () => {
    const issues = checkCompatibility({ cpu: part("cpu", "core-i5-14400f") });
    expect(issues).toEqual([expect.objectContaining({ level: "warning" })]);
  });
});

describe("helpers", () => {
  it("totals prices and estimates wattage", () => {
    expect(totalPrice({ cpu: goodBuild.cpu, gpu: goodBuild.gpu })).toBe(479 + 549);
    expect(estimateWattage(goodBuild)).toBe(75 + 120 + 250);
  });

  it("isCompatibleWith checks a part against the current build", () => {
    const build = { motherboard: goodBuild.motherboard };
    expect(isCompatibleWith(build, part("cpu", "ryzen-5-7600x"))).toBe(true);
    expect(isCompatibleWith(build, part("cpu", "core-ultra-7-265k"))).toBe(false);
  });

  it("isCompatibleWith ignores problems unrelated to the part", () => {
    const build = { ...goodBuild, cooler: part("cooler", "nh-d15-g2"), case: part("case", "h5-flow") };
    expect(isCompatibleWith(build, part("psu", "rm850x"))).toBe(true);
    expect(isCompatibleWith(build, part("psu", "mag-a650bn"))).toBe(true);
    expect(isCompatibleWith({ ...build, gpu: part("gpu", "rtx-5090-fe") }, part("psu", "mag-a650bn"))).toBe(false);
  });
});
