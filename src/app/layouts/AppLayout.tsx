import { Outlet } from 'react-router';
import { Divider } from '@innovaccer/design-system';
import { ToastContainer } from '../../components/app/ToastContainer';
import { AppHeader } from './AppHeader';
import './AppLayout.css';

export function AppLayout() {
  return (
    <div className="d-flex flex-column vh-100">
      <AppHeader />
      <Divider appearance="header" />
      <main className="flex-grow-1 overflow-hidden bg-secondary-lightest">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}
