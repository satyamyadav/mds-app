import { http, HttpResponse, delay } from 'msw';
import type { AttentionItem, DashboardTrends } from '../../features/dashboard/types/dashboard';
import { attentionFixtures, dashboardKpis, dashboardTrends, riskSegments } from '../data/dashboard';
import { patients } from '../data/patients';

const DAY_MS = 24 * 60 * 60 * 1000;

function toIsoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Week-start labels for the last `count` weeks, oldest first (e.g. "Aug 10"). */
function recentWeekLabels(count: number) {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  const today = new Date();
  const weekStart = new Date(today.getTime() - today.getDay() * DAY_MS);
  return Array.from({ length: count }, (_, i) =>
    formatter.format(new Date(weekStart.getTime() - (count - 1 - i) * 7 * DAY_MS)),
  );
}

export const dashboardHandlers = [
  http.get('/api/dashboard/summary', async () => {
    await delay(500);
    return HttpResponse.json({ kpis: dashboardKpis });
  }),

  http.get('/api/dashboard/trends', async () => {
    await delay(700);
    const body: DashboardTrends = {
      weekLabels: recentWeekLabels(dashboardTrends.visitsCompleted.length),
      ...dashboardTrends,
    };
    return HttpResponse.json(body);
  }),

  http.get('/api/dashboard/risk-distribution', async () => {
    await delay(600);
    return HttpResponse.json({ segments: riskSegments });
  }),

  http.get('/api/dashboard/attention', async () => {
    await delay(800);
    const items: AttentionItem[] = attentionFixtures.flatMap((fixture) => {
      const patient = patients.find((p) => p.id === fixture.patientId);
      if (!patient) return [];
      return [
        {
          patientId: patient.id,
          firstName: patient.firstName,
          lastName: patient.lastName,
          riskScore: patient.riskScore,
          reason: fixture.reason,
          dueDate: toIsoDate(new Date(Date.now() + fixture.dueInDays * DAY_MS)),
        },
      ];
    });
    return HttpResponse.json({ items });
  }),
];
