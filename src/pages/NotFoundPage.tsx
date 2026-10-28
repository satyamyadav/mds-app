import { Button, EmptyState } from '@innovaccer/design-system';
import { useNavigate } from 'react-router';
import { Page } from '../components/app/Page';
import { ROUTES } from '../app/router/routes';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist."
        size="large"
      >
        <Button styleType="outlined" onClick={() => navigate(ROUTES.HOME)}>
          Go to overview
        </Button>
      </EmptyState>
    </Page>
  );
}
