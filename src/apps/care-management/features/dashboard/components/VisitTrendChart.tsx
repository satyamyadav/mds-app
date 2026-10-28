import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { DashboardTrends } from '../types/dashboard';
import { getChartTheme } from './chartTheme';

export const CHART_HEIGHT = 280;

export function VisitTrendChart({ trends }: { trends: DashboardTrends }) {
  const option = useMemo(() => {
    const theme = getChartTheme();
    return {
      textStyle: { fontFamily: theme.fontFamily },
      color: [theme.primary, theme.success],
      tooltip: { trigger: 'axis' },
      legend: {
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        textStyle: { color: theme.subtleText },
      },
      grid: { top: 16, left: 8, right: 16, bottom: 40, containLabel: true },
      xAxis: {
        type: 'category',
        data: trends.weekLabels,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: theme.gridLine } },
        axisLabel: { color: theme.subtleText },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: theme.gridLine } },
        axisLabel: { color: theme.subtleText },
      },
      series: [
        {
          name: 'Visits completed',
          type: 'bar',
          barMaxWidth: 20,
          data: trends.visitsCompleted,
        },
        {
          name: 'Care gaps closed',
          type: 'line',
          smooth: true,
          symbolSize: 6,
          data: trends.careGapsClosed,
        },
      ],
    };
  }, [trends]);

  return <ReactECharts option={option} style={{ height: CHART_HEIGHT }} notMerge />;
}
