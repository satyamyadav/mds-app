import { z } from 'zod';

export const kpiSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  previousValue: z.number(),
  /** Which direction counts as an improvement — drives the trend colour. */
  goodDirection: z.enum(['up', 'down']),
  comparisonLabel: z.string(),
});

export const dashboardSummarySchema = z.object({
  kpis: z.array(kpiSchema),
});

export const dashboardTrendsSchema = z.object({
  weekLabels: z.array(z.string()),
  visitsCompleted: z.array(z.number()),
  careGapsClosed: z.array(z.number()),
});

export const riskLevelSchema = z.enum(['High', 'Medium', 'Low']);

export const riskSegmentSchema = z.object({
  level: riskLevelSchema,
  count: z.number(),
});

export const riskDistributionSchema = z.object({
  segments: z.array(riskSegmentSchema),
});

export const attentionItemSchema = z.object({
  patientId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  riskScore: riskLevelSchema,
  reason: z.string(),
  dueDate: z.string(),
});

export const attentionListSchema = z.object({
  items: z.array(attentionItemSchema),
});

export type Kpi = z.infer<typeof kpiSchema>;
export type DashboardSummary = z.infer<typeof dashboardSummarySchema>;
export type DashboardTrends = z.infer<typeof dashboardTrendsSchema>;
export type RiskLevel = z.infer<typeof riskLevelSchema>;
export type RiskSegment = z.infer<typeof riskSegmentSchema>;
export type RiskDistribution = z.infer<typeof riskDistributionSchema>;
export type AttentionItem = z.infer<typeof attentionItemSchema>;
export type AttentionList = z.infer<typeof attentionListSchema>;
