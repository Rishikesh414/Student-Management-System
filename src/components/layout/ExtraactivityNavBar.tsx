import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ExtraactivityNavItem {
  path: string;
  label: string;
}

const extraactivityNavItems: ExtraactivityNavItem[] = [
  { path: '/extracurricular/sports', label: 'Sports' },
  { path: '/extracurricular/events', label: 'Events' },
];

export default function ExtraactivityNavBar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="mb-6">
      <nav className="flex flex-wrap gap-2 border-b border-border">
        {extraactivityNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              'px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px',
              isActive(item.path)
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            )}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
