"use client";

import styles from "./switch.module.css";
import cn from "classnames";
import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-init";

type ColorSchemePreference = "dark" | "light";

const modes: ColorSchemePreference[] = ["light", "dark"];

function normalizeStoredTheme(raw: string | null): ColorSchemePreference {
  if (raw === "dark" || raw === "light") return raw;
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
}

function readStoredTheme(): ColorSchemePreference {
  if (typeof window === "undefined") return "light";
  const ls = globalThis.localStorage;
  if (!ls || typeof ls.getItem !== "function") return "light";
  try {
    return normalizeStoredTheme(ls.getItem(THEME_STORAGE_KEY));
  } catch {
    return "light";
  }
}

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = ({ embedded }: { embedded?: boolean }) => {
  const [mode, setMode] = useState<ColorSchemePreference>(readStoredTheme);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY)
        setMode(normalizeStoredTheme(e.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    try {
      if (
        typeof window !== "undefined" &&
        globalThis.localStorage &&
        typeof globalThis.localStorage.setItem === "function"
      ) {
        globalThis.localStorage.setItem(THEME_STORAGE_KEY, mode);
      }
    } catch {
      /* ignore */
    }
    window.updateDOM?.();
  }, [mode]);

  /** toggle mode */
  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  };
  return (
    <button
      suppressHydrationWarning
      type="button"
      className={cn(styles.switch, embedded && styles.switchEmbedded)}
      onClick={handleModeSwitch}
    />
  );
};

/**
 * This component applies classes and transitions.
 */
type ThemeSwitcherProps = { embedded?: boolean };

export const ThemeSwitcher = ({ embedded }: ThemeSwitcherProps) => {
  return <Switch embedded={embedded} />;
};
