import { patientHandlers } from './handlers/patientHandlers';
import { dashboardHandlers } from './handlers/dashboardHandlers';

export const careManagementHandlers = [...patientHandlers, ...dashboardHandlers];
