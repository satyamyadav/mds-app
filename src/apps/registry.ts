import type { SubApp } from './types';
import { careManagementApp } from './care-management/app';

// Register new sub-apps here. Each one gets a launcher card, a header dropdown and its routes.
export const apps: SubApp[] = [careManagementApp];
