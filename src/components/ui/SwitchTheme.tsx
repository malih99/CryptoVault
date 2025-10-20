import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function SwitchTheme() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", dark);
    html.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark((d) => !d)}
      className="icon-btn text-gray-300"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
