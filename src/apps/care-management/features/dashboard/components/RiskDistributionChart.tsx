import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { RiskLevel, RiskSegment } from '../types/dashboard';
import { getChartTheme } from './chartTheme';
import { CHART_HEIGHT } from './VisitTrendChart';

export function RiskDistributionChart({ segments }: { segments: RiskSegment[] }) {
  const option = useMemo(() => {
    const theme = getChartTheme();
    const colorByLevel: Record<RiskLevel, string> = {
      High: theme.alert,
      Medium: theme.warning,
      Low: theme.success,
    };
    const total = segments.reduce((sum, s) => sum + s.count, 0);

    return {
      textStyle: { fontFamily: theme.fontFamily },
      tooltip: { trigger: 'item', formatter: '{b}: {c} patients ({d}%)' },
      legend: {
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        textStyle: { color: theme.subtleText },
      },
      title: {
        text: total.toLocaleString('en-US'),
        subtext: 'patients',
        left: 'center',
        top: '36%',
        itemGap: 4,
        textStyle: { fontSize: 20, fontWeight: 600, color: theme.text },
        subtextStyle: { fontSize: 12, color: theme.subtleText },
      },
      series: [
        {
          name: 'Risk level',
          type: 'pie',
          radius: ['52%', '72%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          label: { show: false },
          labelLine: { show: false },
          itemStyle: { borderColor: theme.surface, borderWidth: 2 },
          data: segments.map((s) => ({
            name: `${s.level} risk`,
            value: s.count,
            itemStyle: { color: colorByLevel[s.level] },
          })),
        },
      ],
    };
  }, [segments]);

  return <ReactECharts option={option} style={{ height: CHART_HEIGHT }} notMerge />;
}
