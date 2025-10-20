// components/ThemeToggle.tsx
"use client";
import { useToggleTheme } from "../../customHooks/useToggleTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useToggleTheme();

  return (
    <button
      onClick={toggleTheme}
      className="button-base w-10 h-10 bg-primary text-text-muted animate-fadeInUp absolute left-3 top-8 items-center justify-center shadow-md shadow-highlight cursor-pointer4"
    >
      {theme === "dark" ? "L" : "D"}
    </button>
  );
}
