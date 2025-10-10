// SwitchTheme.tsx
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
export default function SwitchTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark((d) => !d)}
      className="h-9 w-9 rounded-xl grid place-items-center border border-border text-gray-300 hover:bg-white/5 active:bg-white/10 transition-colors"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
