export const CARE_ROUTES = {
  BASE: '/apps/care-management',
  DASHBOARD: '/apps/care-management',
  PATIENTS: '/apps/care-management/patients',
  PATIENT_DETAIL: '/apps/care-management/patients/:id',
  NEW_REFERRAL: '/apps/care-management/referrals/new',
} as const;

export function patientPath(id: string) {
  return `${CARE_ROUTES.PATIENTS}/${id}`;
}
