import { Card, Column, Heading, Icon, Row, Text } from '@innovaccer/design-system';
import { useNavigate } from 'react-router';
import { Page } from '../components/app/Page';
import { currentUser } from '../app/currentUser';
import { apps } from '../apps/registry';
import type { SubApp } from '../apps/types';

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

// Landing page composition: ambient greeting on grey, then one card per registered sub-app.
export function AppLauncherPage() {
  return (
    <Page>
      <div className="mb-7">
        <Text appearance="subtle">{today}</Text>
        <Heading size="xl" className="mt-2">
          {`Hi ${currentUser.firstName}`}
        </Heading>
        <Text appearance="subtle" className="mt-2">
          {`You have access to ${apps.length} ${apps.length === 1 ? 'application' : 'applications'}.`}
        </Text>
      </div>

      <Heading size="s" className="mb-5">
        My applications
      </Heading>
      <Row>
        {apps.map((app) => (
          <Column key={app.id} size="4" sizeM="6" sizeXS="12" className="pr-6 pb-6">
            <AppCard app={app} />
          </Column>
        ))}
      </Row>
    </Page>
  );
}

function AppCard({ app }: { app: SubApp }) {
  const navigate = useNavigate();
  const open = () => navigate(app.basePath);

  return (
    <Card
      className="app-launcher__card d-flex align-items-start p-6 h-100"
      role="link"
      tabIndex={0}
      aria-label={`Open ${app.name}`}
      onClick={open}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className="app-launcher__icon d-flex align-items-center justify-content-center flex-shrink-0 mr-5">
        <Icon name={app.icon} size={20} appearance="primary" aria-hidden />
      </div>
      <div className="d-flex flex-column">
        <Text weight="strong">{app.name}</Text>
        <Text size="small" appearance="subtle" className="mt-2">
          {app.description}
        </Text>
      </div>
    </Card>
  );
}
