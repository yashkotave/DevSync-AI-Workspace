import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar.jsx';
import { TopHeader } from '../components/layout/TopHeader.jsx';
import { MetricCards } from '../components/dashboard/MetricCards.jsx';
import { KanbanBoard } from '../components/kanban/KanbanBoard.jsx';
import { TaskDetailModal } from '../components/modals/TaskDetailModal.jsx';
import { CreateTaskModal } from '../components/modals/CreateTaskModal.jsx';
import { useTask } from '../context/TaskContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { apiClient } from '../api/axios.js';

const DashboardPage = () => {
  const { tasks, updateStatus, deleteTask, isCreateModalOpen, setIsCreateModalOpen } = useTask();
  const { user } = useAuth();
  const location = useLocation();
  const [activeTask, setActiveTask] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const response = await apiClient.get('/auth/team');
        if (response.data.success) {
          setTeam(response.data.data);
        }
      } catch (error) {
        setTeam([]);
      }
    };
    loadTeam();
  }, []);

  const section = useMemo(() => {
    if (location.pathname === '/team') return 'Team';
    if (location.pathname === '/board') return 'Board';
    return 'Dashboard';
  }, [location.pathname]);

  const filteredTasks = useMemo(() => tasks, [tasks]);

  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Sidebar />
      <div className="ml-14 md:ml-56">
        <TopHeader />
        <main className="space-y-6 p-4 md:p-8">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-text-secondary">Welcome, {user?.name}</p>
                <h2 className="mt-2 text-2xl font-semibold text-text-primary">{section} overview</h2>
              </div>
              <div className="rounded-2xl bg-[#F7F8FA] px-4 py-3 text-sm text-text-secondary">Live Agile board for team progress</div>
            </div>
          </div>
          <MetricCards tasks={filteredTasks} />
          {section === 'Team' ? (
            <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-text-primary">Team Members</h3>
              <p className="mt-2 text-sm text-text-secondary">Team list with role assignments and membership overview.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {team.map((member) => (
                  <div key={member._id} className="rounded-3xl border border-border bg-[#F7F8FA] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-text-primary">{member.name}</p>
                        <p className="text-sm text-text-secondary">{member.email}</p>
                      </div>
                      <div className="rounded-2xl bg-[#EEF0FF] px-3 py-2 text-sm font-semibold text-primary">{member.role}</div>
                    </div>
                  </div>
                ))}
                {team.length === 0 && <p className="text-sm text-text-secondary">No team members available yet.</p>}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Kanban workflow</h3>
                  <p className="mt-1 text-sm text-text-secondary">Drag through stages or use quick status controls.</p>
                </div>
                <div className="rounded-2xl bg-[#EEF0FF] px-3 py-2 text-sm font-semibold text-primary">{filteredTasks.length} active tasks</div>
              </div>
              <KanbanBoard tasks={filteredTasks} onSelectTask={setActiveTask} onUpdateStatus={updateStatus} />
            </div>
          )}
        </main>
      </div>
      <TaskDetailModal task={activeTask} open={Boolean(activeTask)} onClose={() => setActiveTask(null)} />
      <CreateTaskModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
};

export default DashboardPage;
