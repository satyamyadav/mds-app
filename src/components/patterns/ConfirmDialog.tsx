import { Button, Modal, ModalDescription } from '@innovaccer/design-system';

interface ConfirmDialogProps {
  open: boolean;
  /** Ends with "?" and matches the CTA — e.g. "Delete patient?" */
  title: string;
  /** States the consequence. Never "Are you sure?" */
  description: string;
  /** Repeats the action exactly — e.g. "Delete patient". Never "Yes", "OK" or "Confirm". */
  confirmLabel: string;
  cancelLabel?: string;
  appearance?: 'alert' | 'success';
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Same layout as MDS `Dialog`, built on `Modal` so the footer buttons use the app's dense
 * defaults (tiny; outlined cancel, filled confirm). `Dialog` doesn't expose button size/style.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancel',
  appearance = 'alert',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      dimension="small"
      onClose={onCancel}
      headerOptions={{ heading: title }}
      footer={
        <>
          <Button type="button" styleType="outlined" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button type="button" appearance={appearance} className="ml-4" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <ModalDescription description={description} />
    </Modal>
  );
}
