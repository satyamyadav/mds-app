import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../../../../../store/useToastStore';
import { patientApi } from '../services/patientApi';
import type { PatientFormData } from '../types/patient';

export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PatientFormData) => patientApi.createPatient(data),
    onSuccess: (patient) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.add({
        title: 'Patient added',
        appearance: 'success',
        message: `${patient.firstName} ${patient.lastName} added to your patient list.`,
      });
    },
    onError: () => {
      toast.add({
        title: 'Unable to add patient',
        appearance: 'alert',
        message: "The patient couldn't be added. Try again.",
      });
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PatientFormData }) =>
      patientApi.updatePatient(id, data),
    onSuccess: (patient) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.add({
        title: 'Patient updated',
        appearance: 'success',
        message: `Changes to ${patient.firstName} ${patient.lastName} saved.`,
      });
    },
    onError: () => {
      toast.add({
        title: 'Unable to save changes',
        appearance: 'alert',
        message: "The patient record couldn't be updated. Try again.",
      });
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => patientApi.deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.add({
        title: 'Patient deleted',
        appearance: 'success',
      });
    },
    onError: () => {
      toast.add({
        title: 'Unable to delete patient',
        appearance: 'alert',
        message: "The patient record couldn't be deleted. Try again.",
      });
    },
  });
}
