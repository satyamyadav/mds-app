import {
  Card,
  Heading,
  Icon,
  Placeholder,
  PlaceholderParagraph,
  Text,
} from '@innovaccer/design-system';
import type { Kpi } from '../types/dashboard';

function describeTrend(kpi: Kpi) {
  if (kpi.previousValue === 0 || kpi.value === kpi.previousValue) {
    return {
      text: `No change ${kpi.comparisonLabel}`,
      icon: 'trending_flat',
      tone: 'neutral' as const,
    };
  }
  const change = ((kpi.value - kpi.previousValue) / kpi.previousValue) * 100;
  const isUp = change > 0;
  const isGood = isUp === (kpi.goodDirection === 'up');
  return {
    text: `${Math.abs(change).toFixed(1)}% ${kpi.comparisonLabel}`,
    icon: isUp ? 'trending_up' : 'trending_down',
    tone: isGood ? ('good' as const) : ('bad' as const),
  };
}

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const trend = describeTrend(kpi);
  const iconAppearance =
    trend.tone === 'good' ? 'success' : trend.tone === 'bad' ? 'alert' : 'subtle';
  const textAppearance =
    trend.tone === 'good' ? 'success' : trend.tone === 'bad' ? 'destructive' : 'subtle';

  return (
    <Card className="p-6">
      <Text appearance="subtle" weight="medium">
        {kpi.label}
      </Text>
      <Heading size="xl" className="mt-3">
        {kpi.value.toLocaleString('en-US')}
      </Heading>
      <div className="d-flex align-items-center mt-3">
        <Icon name={trend.icon} size={16} appearance={iconAppearance} className="mr-2" />
        <Text size="small" appearance={textAppearance}>
          {trend.text}
        </Text>
      </div>
    </Card>
  );
}

export function KpiCardPlaceholder() {
  return (
    <Card className="p-6">
      <Placeholder>
        <PlaceholderParagraph length="small" />
        <PlaceholderParagraph length="medium" size="xl" className="mt-3" />
        <PlaceholderParagraph length="medium" className="mt-3" />
      </Placeholder>
    </Card>
  );
}
