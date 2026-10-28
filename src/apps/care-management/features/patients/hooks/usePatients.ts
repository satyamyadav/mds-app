import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { patientApi, type GetPatientsParams } from '../services/patientApi';

export function usePatients(params: GetPatientsParams = {}) {
  return useQuery({
    queryKey: ['patients', params],
    queryFn: () => patientApi.getPatients(params),
    placeholderData: keepPreviousData,
  });
}
