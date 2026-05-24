import { Bell, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTask } from '../../context/TaskContext.jsx';
import { useLocation } from 'react-router-dom';

export const TopHeader = () => {
  const { user } = useAuth();
  const { setIsCreateModalOpen } = useTask();
  const location = useLocation();
  const currentPage = location.pathname === '/team' ? 'Team' : location.pathname === '/board' ? 'Board' : 'Dashboard';

  return (
    <header className="sticky top-0 z-10 flex h-[52px] items-center justify-between gap-4 border-b border-border bg-white px-4 shadow-sm md:px-8">
      <div>
        <h1 className="text-lg font-semibold font-[Plus Jakarta Sans] text-text-primary">{currentPage}</h1>
      </div>
      <div className="flex items-center gap-3">
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
      </div>
    </header>
  );
};

export default TopHeader;
