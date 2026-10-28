import type { ReactNode } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Placeholder,
  PlaceholderParagraph,
  Text,
} from '@innovaccer/design-system';
import { PanelError } from './PanelError';

interface DashboardPanelProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  onRetry: () => void;
  isEmpty: boolean;
  emptyMessage: string;
  /** Shape-matching placeholder shown while loading. Defaults to paragraph lines. */
  loading?: ReactNode;
  children: ReactNode;
}

function DefaultLoading() {
  return (
    <Placeholder>
      <PlaceholderParagraph length="large" />
      <PlaceholderParagraph length="medium" className="mt-4" />
      <PlaceholderParagraph length="large" className="mt-4" />
      <PlaceholderParagraph length="small" className="mt-4" />
      <PlaceholderParagraph length="medium" className="mt-4" />
    </Placeholder>
  );
}

/** A self-contained dashboard card: title, then content or its loading / error / empty state. */
export function DashboardPanel({
  title,
  subtitle,
  action,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  isEmpty,
  emptyMessage,
  loading,
  children,
}: DashboardPanelProps) {
  let body: ReactNode;
  if (isLoading) body = loading ?? <DefaultLoading />;
  else if (isError) body = <PanelError message={errorMessage} onRetry={onRetry} />;
  else if (isEmpty)
    body = (
      <Text appearance="subtle" className="d-block py-4">
        {emptyMessage}
      </Text>
    );
  else body = children;

  return (
    <Card className="h-100 d-flex flex-column">
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <Heading size="s">{title}</Heading>
            {subtitle && (
              <Text size="small" appearance="subtle">
                {subtitle}
              </Text>
            )}
          </div>
          {action}
        </div>
      </CardHeader>
      <CardBody className="pb-6 flex-grow-1">{body}</CardBody>
    </Card>
  );
}
