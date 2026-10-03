"use client";

import { useMemo, useSyncExternalStore } from "react";
import { findPart } from "@/data/parts";
import { categoryIds } from "./categories";
import type { Build, CategoryId } from "./types";

const STORAGE_KEY = "pc-builder:build";
const listeners = new Set<() => void>();
let restored = false;

function restoreSavedBuild() {
  if (restored) return;
  restored = true;
  if (window.location.search) return;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved) {
    window.history.replaceState(null, "", `${window.location.pathname}?${saved}`);
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

function getSnapshot() {
  restoreSavedBuild();
  return window.location.search;
}

function getServerSnapshot() {
  return "";
}

function parseBuild(search: string): Build {
  const params = new URLSearchParams(search);
  const build: Record<string, unknown> = {};
  for (const category of categoryIds) {
    const id = params.get(category);
    const part = id ? findPart(category, id) : undefined;
    if (part) build[category] = part;
  }
  return build as Build;
}

function writeBuild(build: Build) {
  const params = new URLSearchParams();
  for (const category of categoryIds) {
    const part = build[category];
    if (part) params.set(category, part.id);
  }
  const query = params.toString();
  window.history.replaceState(
    null,
    "",
    query ? `${window.location.pathname}?${query}` : window.location.pathname,
  );
  window.localStorage.setItem(STORAGE_KEY, query);
  listeners.forEach((listener) => listener());
}

export function useBuild() {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const build = useMemo(() => parseBuild(search), [search]);

  return {
    build,
    setPart: (category: CategoryId, id: string) => {
      const part = findPart(category, id);
      if (part) writeBuild({ ...build, [category]: part });
    },
    removePart: (category: CategoryId) => {
      const next = { ...build };
      delete next[category];
      writeBuild(next);
    },
    clear: () => writeBuild({}),
  };
}
