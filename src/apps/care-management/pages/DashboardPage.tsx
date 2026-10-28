import { useState } from 'react';
import { Button, Column, Row } from '@innovaccer/design-system';
import { useNavigate } from 'react-router';
import { Page } from '../../../components/app/Page';
import { SidebarLayout } from '../../../components/app/SidebarLayout';
import { PageHeader } from '../../../components/app/PageHeader';
import { EmptyState } from '../../../components/app/EmptyState';
import { CARE_ROUTES } from '../routes';
import {
  useAttentionList,
  useDashboardSummary,
  useDashboardTrends,
  useRiskDistribution,
} from '../features/dashboard/hooks/useDashboard';
import { KpiCard, KpiCardPlaceholder } from '../features/dashboard/components/KpiCard';
import { DashboardPanel } from '../features/dashboard/components/DashboardPanel';
import { VisitTrendChart } from '../features/dashboard/components/VisitTrendChart';
import { RiskDistributionChart } from '../features/dashboard/components/RiskDistributionChart';
import {
  AttentionList,
  AttentionListPlaceholder,
} from '../features/dashboard/components/AttentionList';

/** Horizontal gutter for a column in a row of `count`, keeping outer edges flush with the header. */
function gutter(index: number, count: number) {
  if (count === 1) return '';
  if (index === 0) return 'pr-3';
  if (index === count - 1) return 'pl-3';
  return 'px-3';
}

const KPI_SLOTS = 4;

// Left nav example: each menu switches which panels the dashboard shows.
const dashboardViews = [
  { name: 'overview', label: 'Overview', icon: 'dashboard', group: 'Dashboards' },
  { name: 'care-gaps', label: 'Care gaps', icon: 'assignment_late', group: 'Dashboards' },
  { name: 'risk', label: 'Risk', icon: 'warning', group: 'Dashboards' },
];
type DashboardView = 'overview' | 'care-gaps' | 'risk';

export function DashboardPage() {
  const [view, setView] = useState<DashboardView>('overview');

  return (
    <SidebarLayout
      menus={dashboardViews}
      active={view}
      onSelect={(name) => setView(name as DashboardView)}
      variant="canvas"
    >
      <DashboardContent view={view} />
    </SidebarLayout>
  );
}

function DashboardContent({ view }: { view: DashboardView }) {
  const navigate = useNavigate();
  const title = dashboardViews.find((v) => v.name === view)?.label ?? 'Dashboard';
  const showTrend = view !== 'risk';
  const showRisk = view !== 'care-gaps';
  const summary = useDashboardSummary();
  const trends = useDashboardTrends();
  const risk = useRiskDistribution();
  const attention = useAttentionList();

  const queries = [summary, trends, risk, attention];
  const retryAll = () => queries.forEach((q) => q.refetch());

  if (queries.every((q) => q.isError)) {
    return (
      <Page>
        <PageHeader title={title} />
        <div className="mt-8">
          <EmptyState
            title="Unable to load dashboard"
            description="The dashboard couldn't be loaded. Try again."
          >
            <Button styleType="outlined" icon="refresh" onClick={retryAll}>
              Try again
            </Button>
          </EmptyState>
        </div>
      </Page>
    );
  }

  const kpis = summary.data?.kpis ?? [];
  const weeks = trends.data?.weekLabels ?? [];
  const segments = risk.data?.segments ?? [];
  const attentionItems = attention.data?.items ?? [];

  const trendsEmpty =
    weeks.length === 0 ||
    [...(trends.data?.visitsCompleted ?? []), ...(trends.data?.careGapsClosed ?? [])].every(
      (n) => n === 0,
    );
  const riskEmpty = segments.every((s) => s.count === 0);

  return (
    <Page>
      <PageHeader title={title} />

      {/* KPIs */}
      <div className="mt-6">
        {summary.isPending ? (
          <Row>
            {Array.from({ length: KPI_SLOTS }, (_, i) => (
              <Column key={i} size="3" className={gutter(i, KPI_SLOTS)}>
                <KpiCardPlaceholder />
              </Column>
            ))}
          </Row>
        ) : summary.isError || kpis.length === 0 ? (
          <DashboardPanel
            title="Key metrics"
            isLoading={false}
            isError={summary.isError}
            errorMessage="Key metrics couldn't be loaded."
            onRetry={() => summary.refetch()}
            isEmpty
            emptyMessage="No metrics reported for this period."
          >
            {null}
          </DashboardPanel>
        ) : (
          <Row>
            {kpis.map((kpi, i) => (
              <Column key={kpi.id} size="3" className={gutter(i, kpis.length)}>
                <KpiCard kpi={kpi} />
              </Column>
            ))}
          </Row>
        )}
      </div>

      {/* Charts */}
      <Row className="mt-6">
        {showTrend && (
          <Column size={showRisk ? '8' : '12'} className={showRisk ? 'pr-3' : ''}>
            <DashboardPanel
              title="Visits and care gap closures"
              subtitle={weeks.length ? `Last ${weeks.length} weeks` : undefined}
              isLoading={trends.isPending}
              isError={trends.isError}
              errorMessage="The visit trend couldn't be loaded."
              onRetry={() => trends.refetch()}
              isEmpty={trendsEmpty}
              emptyMessage="No visits or care gap closures recorded for this period."
            >
              {trends.data && <VisitTrendChart trends={trends.data} />}
            </DashboardPanel>
          </Column>
        )}
        {showRisk && (
          <Column size={showTrend ? '4' : '12'} className={showTrend ? 'pl-3' : ''}>
            <DashboardPanel
              title="Patients by risk level"
              subtitle="Active patients"
              isLoading={risk.isPending}
              isError={risk.isError}
              errorMessage="The risk breakdown couldn't be loaded."
              onRetry={() => risk.refetch()}
              isEmpty={riskEmpty}
              emptyMessage="No active patients have a risk level assigned."
            >
              <RiskDistributionChart segments={segments} />
            </DashboardPanel>
          </Column>
        )}
      </Row>

      {/* Needs attention */}
      <Row className="mt-6">
        <Column size="12">
          <DashboardPanel
            title="Needs attention"
            subtitle={
              attentionItems.length
                ? `${attentionItems.length} ${attentionItems.length === 1 ? 'patient' : 'patients'} with overdue or upcoming follow-ups`
                : undefined
            }
            action={
              <Button
                appearance="transparent"
                size="tiny"
                onClick={() => navigate(CARE_ROUTES.PATIENTS)}
              >
                View all patients
              </Button>
            }
            isLoading={attention.isPending}
            isError={attention.isError}
            errorMessage="The attention list couldn't be loaded."
            onRetry={() => attention.refetch()}
            isEmpty={attentionItems.length === 0}
            emptyMessage="No patients need follow-up right now."
            loading={<AttentionListPlaceholder />}
          >
            <AttentionList items={attentionItems} />
          </DashboardPanel>
        </Column>
      </Row>
    </Page>
  );
}
