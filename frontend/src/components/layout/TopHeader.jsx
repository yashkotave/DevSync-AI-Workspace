import { Bell, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTask } from '../../context/TaskContext.jsx';
import { useLocation, Link } from 'react-router-dom';

export const TopHeader = () => {
  const { user } = useAuth();
  const { setIsCreateModalOpen } = useTask();
  const location = useLocation();
  const currentPage = location.pathname === '/team' ? 'Team' : location.pathname === '/board' ? 'Board' : location.pathname === '/dashboard' ? 'Dashboard' : '';

  return (
    <header className="sticky top-0 z-10 flex h-[64px] items-center justify-between gap-4 border-b border-border bg-white px-4 shadow-sm md:px-8">
      <div className="flex items-center gap-3">
        <Link to="/" className="mr-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary text-lg font-bold">DS</div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-semibold font-[Plus Jakarta Sans] text-text-primary">DevSync</span>
            <span className="text-xs text-text-secondary">Workspace</span>
          </div>
        </Link>
        {currentPage && <h1 className="text-lg font-semibold font-[Plus Jakarta Sans] text-text-primary">{currentPage}</h1>}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            {user?.role === 'Manager' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                <Plus size={16} />
                New Task
              </button>
            )}
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-text-secondary transition hover:border-primary hover:text-primary">
              <Bell size={18} />
            </button>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              {user?.name?.split(' ').map((item) => item[0]).join('').slice(0, 2)}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-text-secondary hover:text-primary">Login</Link>
            <Link
              to="/login?mode=register"
              className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
