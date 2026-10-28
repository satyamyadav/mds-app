import { createBrowserRouter } from 'react-router';
import { ROUTES } from './routes';
import { AppLayout } from '../layouts/AppLayout';
import { apps } from '../../apps/registry';
import { AppLauncherPage } from '../../pages/AppLauncherPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.HOME, element: <AppLauncherPage /> },
      ...apps.map((app) => ({ path: app.basePath, children: app.routes })),
      { path: ROUTES.SETTINGS, element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
