import { Link, NavLink } from 'react-router-dom';
import { Grid, Home, LogOut, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { BrandLogo } from '../BrandLogo.jsx';

const navItems = [
  { label: 'Dashboard', icon: Home, to: '/dashboard' },
  { label: 'Board', icon: Grid, to: '/board' },
  { label: 'Team', icon: Users, to: '/team' }
];

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
    : 'DS';

  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-14 border-r border-border bg-surface md:w-56">
      <div className="flex h-full flex-col justify-between px-3 py-4">
        <div className="space-y-6">
          <div className="flex h-12 items-center justify-center md:justify-start px-2">
            <Link to="/" className="w-full">
              <BrandLogo />
            </Link>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition duration-150 ${
                      isActive
                        ? 'border-l-4 border-primary bg-[#EEF0FF] text-primary'
                        : 'text-text-secondary hover:bg-[#F0F1FF] hover:text-primary'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="rounded-2xl border border-border bg-white p-3 shadow-soft hidden md:block">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{user?.name}</p>
              <p className="text-xs text-text-secondary">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm text-text-secondary transition hover:border-primary hover:text-primary"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
