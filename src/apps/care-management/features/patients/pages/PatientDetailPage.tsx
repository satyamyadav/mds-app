import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '@innovaccer/design-system';
import { EmptyState } from '../../../../../components/app/EmptyState';
import { Page } from '../../../../../components/app/Page';
import { PageHeader } from '../../../../../components/app/PageHeader';
import { LoadingState } from '../../../../../components/app/LoadingState';
import { PatientDetail } from '../components/PatientDetail';
import { PatientForm } from '../components/PatientForm';
import { ConfirmDialog } from '../../../../../components/patterns/ConfirmDialog';
import { usePatient } from '../hooks/usePatient';
import { useUpdatePatient, useDeletePatient } from '../hooks/usePatientMutation';
import type { PatientFormData } from '../types/patient';
import { CARE_ROUTES } from '../../../routes';

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: patient, isLoading, isError, refetch } = usePatient(id!);
  const updatePatient = useUpdatePatient();
  const deletePatient = useDeletePatient();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) return <LoadingState />;

  if (isError || !patient) {
    return (
      <Page>
        <EmptyState
          title="Unable to load patient record"
          description="The patient record couldn't be loaded. Try again."
        >
          <Button styleType="outlined" onClick={() => refetch()}>
            Try again
          </Button>
        </EmptyState>
      </Page>
    );
  }

  const fullName = `${patient.firstName} ${patient.lastName}`;

  const handleUpdate = (data: PatientFormData) => {
    updatePatient.mutate({ id: id!, data }, { onSuccess: () => setEditOpen(false) });
  };

  const handleDelete = () => {
    deletePatient.mutate(id!, {
      onSuccess: () => navigate(CARE_ROUTES.PATIENTS),
    });
  };

  return (
    <Page>
      <PageHeader
        title={fullName}
        showBackButton
        breadcrumbs={[
          { label: 'Care Management', link: CARE_ROUTES.BASE },
          { label: 'Patients', link: CARE_ROUTES.PATIENTS },
          { label: fullName },
        ]}
        actions={
          <div className="d-flex">
            <Button
              appearance="basic"
              styleType="outlined"
              onClick={() => setEditOpen(true)}
              className="mr-2"
            >
              Edit
            </Button>
            <Button appearance="alert" styleType="outlined" onClick={() => setDeleteOpen(true)}>
              Delete
            </Button>
          </div>
        }
      />
      <PatientDetail patient={patient} />
      <PatientForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        defaultValues={patient}
        isSubmitting={updatePatient.isPending}
      />
      <ConfirmDialog
        open={deleteOpen}
        title="Delete patient?"
        description={`${fullName}'s record, conditions and encounters will be permanently removed. This can't be undone.`}
        confirmLabel="Delete patient"
        appearance="alert"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </Page>
  );
}
