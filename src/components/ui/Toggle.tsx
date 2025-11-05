import { useState } from "react";

export default function Toggle({
  defaultChecked = false,
}: {
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <div
        className="
          flex h-6 w-10 items-center rounded-full px-1
          bg-slate-200 dark:bg-slate-700
          peer-checked:bg-emerald-500
          peer-checked:justify-end
          justify-start
          transition-all
        "
      >
        <div className="h-4 w-4 rounded-full bg-white shadow" />
      </div>
    </label>
  );
}
