import { Button, Text } from '@innovaccer/design-system';

interface PanelErrorProps {
  message: string;
  onRetry: () => void;
}

/** Card-level load error: one line + "Try again" on the same line. */
export function PanelError({ message, onRetry }: PanelErrorProps) {
  return (
    <div className="d-flex align-items-center justify-content-between py-4">
      <Text appearance="subtle">{message}</Text>
      <Button size="tiny" styleType="outlined" icon="refresh" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
