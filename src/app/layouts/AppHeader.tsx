import { useLocation, useNavigate } from 'react-router';
import { Avatar, Button, Menu, Text } from '@innovaccer/design-system';
import { ROUTES } from '../router/routes';
import { currentUser } from '../currentUser';
import { getActiveLink, isGroup, navConfig, type NavEntry } from './navConfig';

function navItemClass(active: boolean) {
  return `app-header__nav-item mr-6${active ? ' app-header__nav-item--active' : ''}`;
}

function NavGroup({ entry, activeLink }: { entry: NavEntry; activeLink?: string }) {
  const navigate = useNavigate();

  if (!isGroup(entry)) {
    return (
      <Button
        appearance="transparent"
        className={navItemClass(entry.link === activeLink)}
        aria-current={entry.link === activeLink ? 'page' : undefined}
        onClick={() => navigate(entry.link)}
      >
        {entry.label}
      </Button>
    );
  }

  const groupActive = entry.items.some((item) => item.link === activeLink);

  return (
    <Menu
      aria-label={`${entry.label} pages`}
      position="bottom-start"
      width={200}
      trigger={
        <Button
          appearance="transparent"
          icon="keyboard_arrow_down"
          iconAlign="right"
          className={navItemClass(groupActive)}
        >
          {entry.label}
        </Button>
      }
    >
      <Menu.List size="compressed">
        {entry.items.map((item) => (
          <Menu.Item key={item.link} onClick={() => navigate(item.link)}>
            <span
              className={item.link === activeLink ? 'app-header__menu-item--active' : undefined}
            >
              {item.label}
            </span>
          </Menu.Item>
        ))}
      </Menu.List>
    </Menu>
  );
}

export function AppHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeLink = getActiveLink(pathname);

  return (
    <header className="app-header d-flex align-items-center justify-content-between flex-shrink-0 bg-light px-6">
      <nav aria-label="Main navigation" className="d-flex align-items-center">
        <div
          className="app-header__logo d-flex align-items-center justify-content-center flex-shrink-0 mr-6"
          onClick={() => navigate(ROUTES.HOME)}
        >
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Home" width={19} height={24} />
        </div>
        {navConfig.map((entry) => (
          <NavGroup key={entry.label} entry={entry} activeLink={activeLink} />
        ))}
      </nav>

      <Menu
        aria-label="Account menu"
        position="bottom-end"
        width={240}
        trigger={
          <Button
            appearance="transparent"
            icon="keyboard_arrow_down"
            iconAlign="right"
            className="app-header__nav-item"
          >
            {currentUser.firstName}
          </Button>
        }
      >
        <div className="d-flex align-items-center px-6 py-5">
          <Avatar firstName={currentUser.firstName} lastName={currentUser.lastName} size="tiny" />
          <div className="d-flex flex-column ml-4">
            <Text weight="medium">{`${currentUser.firstName} ${currentUser.lastName}`}</Text>
            <Text size="small" appearance="subtle">
              {currentUser.email}
            </Text>
          </div>
        </div>
        <Menu.Group showDivider>
          <Menu.List size="compressed">
            <Menu.Item onClick={() => navigate(ROUTES.SETTINGS)}>Settings</Menu.Item>
          </Menu.List>
        </Menu.Group>
      </Menu>
    </header>
  );
}
