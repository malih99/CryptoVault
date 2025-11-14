import Modal from "./Modal";

export type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  tone?: "default" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  tone = "default",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmCls =
    tone === "danger"
      ? "bg-rose-600 hover:bg-rose-700 text-white"
      : "bg-emerald-600 hover:bg-emerald-700 text-white";

  return (
    <Modal open={open} onClose={onCancel} ariaLabel="confirm-dialog">
      <div className="space-y-3">
        <div className="text-base font-semibold text-slate-900 dark:text-slate-50">
          {title}
        </div>
        {description && (
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {description}
          </div>
        )}
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl px-3 py-1.5 text-sm font-medium ${confirmCls}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
