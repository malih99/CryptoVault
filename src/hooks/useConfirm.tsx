import { useState } from "react";
import ConfirmDialog, {
  ConfirmDialogProps,
} from "../components/ui/ConfirmDialog";

type ConfirmOptions = Omit<
  ConfirmDialogProps,
  "open" | "onConfirm" | "onCancel"
>;

export function useConfirm() {
  const [opts, setOpts] = useState<ConfirmOptions | null>(null);
  return {
    ConfirmHost: () =>
      opts ? (
        <ConfirmDialog
          open
          title={opts.title}
          description={opts.description}
          confirmText={opts.confirmText}
          cancelText={opts.cancelText}
          tone={opts.tone}
          onConfirm={() => (opts as any)._res(true)}
          onCancel={() => (opts as any)._res(false)}
        />
      ) : null,
    confirm: (options: ConfirmOptions) =>
      new Promise<boolean>((res) => {
        setOpts({
          ...options,
          _res: (v: boolean) => {
            res(v);
            setOpts(null);
          },
        } as any);
      }),
  };
}
