import type { SubApp } from '../types';
import { CARE_ROUTES } from './routes';
import { DashboardPage } from './pages/DashboardPage';
import { ReferralPage } from './pages/ReferralPage';
import { PatientsPage } from './features/patients/pages/PatientsPage';
import { PatientDetailPage } from './features/patients/pages/PatientDetailPage';

export const careManagementApp: SubApp = {
  id: 'care-management',
  name: 'Care Management',
  description: 'Patient lists, care gaps and referrals',
  icon: 'medical_services',
  basePath: CARE_ROUTES.BASE,
  nav: [
    { label: 'Dashboard', path: '' },
    { label: 'Patients', path: 'patients' },
    { label: 'New referral', path: 'referrals/new' },
  ],
  // Paths are relative to basePath.
  routes: [
    { index: true, element: <DashboardPage /> },
    { path: 'patients', element: <PatientsPage /> },
    { path: 'patients/:id', element: <PatientDetailPage /> },
    { path: 'referrals/new', element: <ReferralPage /> },
  ],
};
