import { cn } from "../../lib/cn";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-200/80 dark:bg-slate-700/50",
        className
      )}
    />
  );
}

export function KPICardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 p-4 sm:p-5 dark:border-slate-800">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-3 h-6 w-20 sm:h-7" />
    </div>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 sm:p-5 dark:border-slate-800">
      <Skeleton className="mb-3 h-4 w-32" />
      <div className="hidden overflow-x-auto lg:block">
        <div className="min-w-[720px]">
          <Skeleton className="h-8 w-full" />
          <div className="mt-2 space-y-2">
            {Array.from({ length: rows }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-3 lg:hidden">
        {Array.from({ length: Math.min(5, rows) }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 p-3 dark:border-slate-800"
          >
            <Skeleton className="h-4 w-36" />
            <Skeleton className="mt-2 h-4 w-52" />
            <Skeleton className="mt-2 h-4 w-40" />
          </div>
        ))}
      </div>
    </div>
  );
}
