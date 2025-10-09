import { useEffect, useState } from "react";
export default function SwitchTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      className="px-3 py-2 rounded-xl border border-border"
      onClick={() => setDark((d) => !d)}
    >
      🌗
    </button>
  );
}
