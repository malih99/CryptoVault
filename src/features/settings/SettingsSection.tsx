import { ReactNode } from "react";
import Card from "../../components/ui/Card";

export default function SettingsSection({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={`p-5 sm:p-6 ${className}`}>
      <div className="mb-4">
        <h2 className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </Card>
  );
}
