import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { VerticalNav, Icon } from '@innovaccer/design-system';
import { useSidebarStore } from '../../store/useSidebarStore';

interface MenuItem {
  name: string;
  label: string;
  icon: string;
  link?: string;
  group?: string;
  count?: number;
}

interface SidebarLayoutProps {
  menus: MenuItem[];
  defaultActive?: string;
  /** Controlled active menu. Pass with `onSelect` when menus act as filters. */
  active?: string;
  onSelect?: (name: string) => void;
  /** `panel` (default): white content area. `canvas`: grey background for card layouts like dashboards. */
  variant?: 'panel' | 'canvas';
  children: ReactNode;
}

export function SidebarLayout({
  menus,
  defaultActive,
  active: activeProp,
  onSelect,
  variant = 'panel',
  children,
}: SidebarLayoutProps) {
  const navigate = useNavigate();
  const { expanded, toggle } = useSidebarStore();
  const [activeState, setActive] = useState(defaultActive ?? menus[0]?.name ?? '');
  const active = activeProp ?? activeState;

  return (
    <div className="app-sidebar-layout">
      <nav
        className={`app-sidebar ${expanded ? 'app-sidebar--expanded' : 'app-sidebar--collapsed'}`}
      >
        <VerticalNav
          menus={menus}
          expanded={expanded}
          active={{ name: active }}
          onClick={(menu: { name: string; link?: string }) => {
            setActive(menu.name);
            onSelect?.(menu.name);
            if (menu.link) navigate(menu.link);
          }}
          autoCollapse={false}
        />
        <div className="app-sidebar__toggle" onClick={toggle}>
          <Icon name={expanded ? 'chevron_left' : 'chevron_right'} size={16} />
        </div>
      </nav>
      <div className={`app-sidebar-layout__content app-sidebar-layout__content--${variant}`}>
        {children}
      </div>
    </div>
  );
}
