"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      {theme === "light" ? (
        <button
          aria-label="Switch to dark theme"
          onClick={() => setTheme("dark")}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Moon className="h-[1.5rem] w-[1.5rem] text-muted-foreground" />
        </button>
      ) : (
        <button
          aria-label="Switch to light theme"
          onClick={() => setTheme("light")}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Sun className="h-[1.5rem] w-[1.5rem] text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
