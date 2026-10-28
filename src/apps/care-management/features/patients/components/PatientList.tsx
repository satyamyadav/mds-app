import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Table, Badge, Button, Text, Link } from '@innovaccer/design-system';
import type { GridCellProps } from '@innovaccer/design-system';
import { EmptyState } from '../../../../../components/app/EmptyState';
import { patientPath } from '../../../routes';
import { patientApi, type GetPatientsParams } from '../services/patientApi';
import type { Patient } from '../types/patient';

interface PatientListProps {
  /** List filters from the page sidebar. Search comes from the Table's own header. */
  filters: Pick<GetPatientsParams, 'status' | 'risk'>;
  onAdd: () => void;
}

function getAge(dob: string): number {
  const parts = dob.split('/');
  const birthDate = new Date(+parts[2], +parts[0] - 1, +parts[1]);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

const riskLevelAppearance: Record<string, 'success' | 'warning' | 'alert'> = {
  L: 'success',
  M: 'warning',
  H: 'alert',
};

const PAGE_SIZE = 10;

const schema = [
  {
    name: 'patientName',
    displayName: 'Patient name',
    width: '18%',
    sorting: true,
    cellRenderer: (props: GridCellProps) => {
      const row = props.data as Patient;
      const age = getAge(row.dateOfBirth);
      const displayName = row.preferredName
        ? `${row.lastName}, ${row.firstName} (${row.preferredName})`
        : `${row.lastName}, ${row.firstName}`;
      return (
        <div>
          <Link href={patientPath(row.id)}>{displayName}</Link>
          <div>
            <Text size="small" appearance="subtle">
              {row.dateOfBirth} ({age}y), {row.gender}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    name: 'empi',
    displayName: 'EMPI',
    width: '10%',
    sorting: true,
  },
  {
    name: 'assignedDate',
    displayName: 'Assigned date',
    width: '12%',
    sorting: true,
  },
  {
    name: 'ongoingActivity',
    displayName: 'My ongoing activity',
    width: '20%',
    cellRenderer: (props: GridCellProps) => {
      const row = props.data as Patient;
      if (!row.ongoingActivity) return <></>;
      return (
        <span>
          <Link>{row.ongoingActivity.name}</Link>
          {row.ongoingActivity.count != null && row.ongoingActivity.count > 0 && (
            <Link className="ml-2">+{row.ongoingActivity.count}</Link>
          )}
        </span>
      );
    },
  },
  {
    name: 'keyDiagnosis',
    displayName: 'Key diagnosis',
    width: '20%',
    cellRenderer: (props: GridCellProps) => {
      const row = props.data as Patient;
      if (!row.keyDiagnosis) return <></>;
      return (
        <div>
          <Text>
            {row.keyDiagnosis.name}
            {row.keyDiagnosis.count != null && row.keyDiagnosis.count > 0 && (
              <Link className="ml-2">+{row.keyDiagnosis.count}</Link>
            )}
          </Text>
          <div>
            <Text size="small" appearance="subtle">
              {row.keyDiagnosis.icdCode}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    name: 'risk',
    displayName: 'Risk',
    width: '15%',
    cellRenderer: (props: GridCellProps) => {
      const row = props.data as Patient;
      if (!row.riskInfo) return <></>;
      return (
        <span className="d-flex align-items-center">
          <Text>
            {row.riskInfo.model} - {row.riskInfo.score}
          </Text>
          <Badge appearance={riskLevelAppearance[row.riskInfo.level]} subtle>
            {row.riskInfo.level}
          </Badge>
          {row.riskInfo.additionalCount != null && row.riskInfo.additionalCount > 0 && (
            <Link>+{row.riskInfo.additionalCount}</Link>
          )}
        </span>
      );
    },
  },
];

const loaderSchema = schema.map((s) => ({
  name: s.name,
  displayName: s.displayName,
  width: s.width,
}));

export function PatientList({ filters, onAdd }: PatientListProps) {
  const navigate = useNavigate();
  const { status, risk } = filters;
  // Table only fetches on mount — bump this to remount and refetch (filter change or retry).
  const [reloadKey, setReloadKey] = useState(0);
  const searchTermRef = useRef('');

  const fetchData = useCallback(
    async (options: { page?: number; pageSize?: number; searchTerm?: string }) => {
      searchTermRef.current = options.searchTerm ?? '';
      const res = await patientApi.getPatients({
        search: searchTermRef.current,
        status,
        risk,
        page: options.page ?? 1,
        limit: options.pageSize ?? PAGE_SIZE,
      });
      return { count: res.total, data: res.data, schema };
    },
    [status, risk],
  );

  return (
    <div className="h-100 overflow-hidden">
      <Table
        key={`${status ?? 'all'}-${risk ?? 'all'}-${reloadKey}`}
        type="data"
        size="standard"
        fetchData={fetchData}
        loaderSchema={loaderSchema}
        withHeader={true}
        headerOptions={{
          withSearch: true,
          searchPlaceholder: 'Search by name or EMPI',
          allowColumnReordering: true,
          dynamicColumn: true,
        }}
        withPagination={true}
        pageSize={PAGE_SIZE}
        paginationType="jump"
        onRowClick={(rowData: Record<string, unknown>) => {
          const row = rowData as unknown as Patient;
          navigate(patientPath(row.id));
        }}
        showMenu={false}
        errorTemplate={({ errorType }: { errorType?: string }) => {
          if (errorType === 'FAILED_TO_FETCH') {
            return (
              <EmptyState
                title="Unable to load patients"
                description="The patient list couldn't be loaded. Try again."
              >
                <Button size="tiny" styleType="outlined" onClick={() => setReloadKey((k) => k + 1)}>
                  Try again
                </Button>
              </EmptyState>
            );
          }
          const term = searchTermRef.current.trim();
          if (term) {
            return (
              <EmptyState
                title={`No patients match "${term}"`}
                description="Check the spelling, or search by EMPI."
              />
            );
          }
          return (
            <EmptyState title="No patients in this list.">
              <Button size="tiny" styleType="outlined" onClick={onAdd}>
                Add patient
              </Button>
            </EmptyState>
          );
        }}
      />
    </div>
  );
}
