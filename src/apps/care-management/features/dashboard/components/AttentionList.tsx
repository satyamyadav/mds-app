import {
  Avatar,
  Badge,
  Listbox,
  Placeholder,
  PlaceholderParagraph,
  Text,
} from '@innovaccer/design-system';
import type { BadgeProps, ListboxProps } from '@innovaccer/design-system';
import type { ComponentType } from 'react';
import { useNavigate } from 'react-router';
import { patientPath } from '../../../routes';
import type { AttentionItem, RiskLevel } from '../types/dashboard';

const riskAppearance: Record<RiskLevel, NonNullable<BadgeProps['appearance']>> = {
  High: 'alert',
  Medium: 'warning',
  Low: 'success',
};

/**
 * MDS 5.0.0-31 ships `ListboxInternalProps` as an interface extending an intersection type,
 * which TypeScript collapses so `children`/`type` are rejected. Re-type it with the public props.
 */
const List = Listbox as unknown as ComponentType<ListboxProps> & { Item: typeof Listbox.Item };

const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

/** Parses a YYYY-MM-DD string as a local date (avoids the UTC shift of `new Date(iso)`). */
function parseLocalDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function describeDue(iso: string) {
  const due = parseLocalDate(iso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((due.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
  const label = `Due ${shortDate.format(due)}`;
  if (diffDays < 0) return { text: `${label} · Overdue`, overdue: true };
  if (diffDays === 0) return { text: `${label} · Today`, overdue: false };
  return { text: label, overdue: false };
}

export function AttentionList({ items }: { items: AttentionItem[] }) {
  const navigate = useNavigate();

  return (
    <List type="resource" size="compressed" showDivider aria-label="Patients needing attention">
      {items.map((item) => {
        const due = describeDue(item.dueDate);
        return (
          <List.Item
            key={item.patientId}
            id={item.patientId}
            onClick={() => navigate(patientPath(item.patientId))}
          >
            <div className="d-flex align-items-center">
              <Avatar
                firstName={item.firstName}
                lastName={item.lastName}
                size="tiny"
                className="mr-4"
              />
              <div className="flex-grow-1 overflow-hidden mr-4">
                <div className="d-flex align-items-center">
                  <Text weight="medium">{`${item.firstName} ${item.lastName}`}</Text>
                  <Badge appearance={riskAppearance[item.riskScore]} subtle className="ml-3">
                    {`${item.riskScore} risk`}
                  </Badge>
                </div>
                <Text size="small" appearance="subtle" className="d-block ellipsis--noWrap">
                  {item.reason}
                </Text>
              </div>
              <Text
                size="small"
                appearance={due.overdue ? 'destructive' : 'subtle'}
                className="flex-shrink-0 text-align-right"
              >
                {due.text}
              </Text>
            </div>
          </List.Item>
        );
      })}
    </List>
  );
}

export function AttentionListPlaceholder() {
  return (
    <div>
      {[0, 1, 2, 3].map((i) => (
        <Placeholder key={i} withImage round imageSize="medium" className="py-4">
          <PlaceholderParagraph length="medium" />
          <PlaceholderParagraph length="large" size="s" />
        </Placeholder>
      ))}
    </div>
  );
}
