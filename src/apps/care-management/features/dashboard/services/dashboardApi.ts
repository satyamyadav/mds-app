import { apiClient } from '../../../../../services/apiClient';
import type {
  AttentionList,
  DashboardSummary,
  DashboardTrends,
  RiskDistribution,
} from '../types/dashboard';

export const dashboardApi = {
  getSummary: () => apiClient.get<DashboardSummary>('/dashboard/summary'),
  getTrends: () => apiClient.get<DashboardTrends>('/dashboard/trends'),
  getRiskDistribution: () => apiClient.get<RiskDistribution>('/dashboard/risk-distribution'),
  getAttentionList: () => apiClient.get<AttentionList>('/dashboard/attention'),
};
