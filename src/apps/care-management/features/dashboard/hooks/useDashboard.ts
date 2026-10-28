import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../services/dashboardApi';

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: dashboardApi.getSummary,
  });
}

export function useDashboardTrends() {
  return useQuery({
    queryKey: ['dashboard', 'trends'],
    queryFn: dashboardApi.getTrends,
  });
}

export function useRiskDistribution() {
  return useQuery({
    queryKey: ['dashboard', 'risk-distribution'],
    queryFn: dashboardApi.getRiskDistribution,
  });
}

export function useAttentionList() {
  return useQuery({
    queryKey: ['dashboard', 'attention'],
    queryFn: dashboardApi.getAttentionList,
  });
}
