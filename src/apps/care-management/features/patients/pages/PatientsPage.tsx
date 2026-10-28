import { useState } from 'react';
import { Button, Heading } from '@innovaccer/design-system';
import { SidebarLayout } from '../../../../../components/app/SidebarLayout';
import { PatientList } from '../components/PatientList';
import { PatientForm } from '../components/PatientForm';
import { useCreatePatient } from '../hooks/usePatientMutation';
import type { GetPatientsParams } from '../services/patientApi';
import type { PatientFormData } from '../types/patient';

// Each sidebar item is a saved list: a label plus the API filters it applies.
const patientLists: {
  name: string;
  label: string;
  icon: string;
  group: string;
  filters: Pick<GetPatientsParams, 'status' | 'risk'>;
}[] = [
  { name: 'all', label: 'All patients', icon: 'people', group: 'Patient lists', filters: {} },
  {
    name: 'active',
    label: 'Active',
    icon: 'check_circle',
    group: 'Patient lists',
    filters: { status: 'Active' },
  },
  {
    name: 'inactive',
    label: 'Inactive',
    icon: 'history',
    group: 'Patient lists',
    filters: { status: 'Inactive' },
  },
  { name: 'high', label: 'High risk', icon: 'warning', group: 'Risk', filters: { risk: 'High' } },
  {
    name: 'medium',
    label: 'Medium risk',
    icon: 'error_outline',
    group: 'Risk',
    filters: { risk: 'Medium' },
  },
  { name: 'low', label: 'Low risk', icon: 'low_priority', group: 'Risk', filters: { risk: 'Low' } },
];

export function PatientsPage() {
  const [activeList, setActiveList] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const createPatient = useCreatePatient();

  const list = patientLists.find((l) => l.name === activeList) ?? patientLists[0];

  const handleCreate = (data: PatientFormData) => {
    createPatient.mutate(data, {
      onSuccess: () => setFormOpen(false),
    });
  };

  return (
    <SidebarLayout
      menus={patientLists.map(({ name, label, icon, group }) => ({ name, label, icon, group }))}
      active={activeList}
      onSelect={setActiveList}
    >
      <div className="d-flex flex-column h-100">
        <div className="d-flex align-items-center justify-content-between px-6 pb-4">
          <Heading size="m">{list.label}</Heading>
          <Button appearance="primary" icon="add" onClick={() => setFormOpen(true)}>
            Add patient
          </Button>
        </div>
        <div className="flex-grow-1 overflow-hidden">
          <PatientList filters={list.filters} onAdd={() => setFormOpen(true)} />
        </div>
      </div>
      <PatientForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
        isSubmitting={createPatient.isPending}
      />
    </SidebarLayout>
  );
}
