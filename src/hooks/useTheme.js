import { useEffect, useState } from "react";

const STORAGE_KEY = "vsr-portfolio-editorial-theme";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "sandal";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "sandal" || saved === "espresso") return saved;
    return "sandal";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "sandal" ? "espresso" : "sandal"));
  };

  return { theme, toggleTheme };
}
