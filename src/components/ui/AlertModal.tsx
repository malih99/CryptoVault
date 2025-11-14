import Modal from "./Modal";

export default function AlertModal({
  open,
  title = "Notice",
  message,
  onClose,
  okText = "OK",
}: {
  open: boolean;
  title?: string;
  message: string;
  okText?: string;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="alert-dialog">
      <div className="space-y-3">
        <div className="text-base font-semibold text-slate-900 dark:text-slate-50">
          {title}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300">
          {message}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            {okText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
