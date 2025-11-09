import { useState } from "react";

type ToggleProps = {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (value: boolean) => void;
};

export default function Toggle({
  defaultChecked = false,
  checked,
  onChange,
}: ToggleProps) {
  const isControlled = typeof checked === "boolean";
  const [internal, setInternal] = useState(defaultChecked);

  const value = isControlled ? checked : internal;

  const handleChange = () => {
    const next = !value;
    if (!isControlled) {
      setInternal(next);
    }
    onChange?.(next);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={value}
        onChange={handleChange}
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
