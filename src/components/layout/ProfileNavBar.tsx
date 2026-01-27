import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProfileNavItem {
  path: string;
  label: string;
}

const profileNavItems: ProfileNavItem[] = [
  { path: '/profile/basic', label: 'Basic Info' },
  { path: '/profile/personal', label: 'Personal Info' },
  { path: '/profile/parent', label: 'Parent Info' },
  { path: '/profile/reference', label: 'Reference' },
  { path: '/profile/photos', label: 'Photos' },
];

export default function ProfileNavBar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="mb-6">
      <nav className="flex flex-wrap gap-2 border-b border-border">
        {profileNavItems.map((item) => (
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
