import { motion } from 'framer-motion';
import TaskCard from './TaskCard.jsx';

const columns = [
  { key: 'To Do', accent: '#78909C' },
  { key: 'In Progress', accent: '#1E88E5' },
  { key: 'Review', accent: '#FB8C00' },
  { key: 'Completed', accent: '#43A047' }
];

export const KanbanBoard = ({ tasks, onSelectTask, onUpdateStatus }) => {
  return (
    <div className="overflow-x-auto pb-6">
      <div className="min-w-[1080px] grid gap-4 md:grid-cols-4">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.key);
          return (
            <div key={column.key} className="rounded-3xl bg-[#F7F8FA] p-4">
              <div className="mb-4 flex items-end justify-between gap-2 rounded-2xl border border-border bg-white px-4 py-3">
                <div>
                  <h2 className="text-sm font-semibold text-text-primary">{column.key}</h2>
                  <p className="text-xs text-text-secondary">{columnTasks.length} tasks</p>
                </div>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: column.accent }}></span>
              </div>
              <div className="space-y-3">
                {columnTasks.map((task, index) => (
                  <motion.div key={task._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, ease: 'easeOut', delay: index * 0.02 }}>
                    <TaskCard task={task} onSelect={() => onSelectTask(task)} onUpdateStatus={onUpdateStatus} />
                  </motion.div>
                ))}
                {columnTasks.length === 0 && (
                  <div className="rounded-3xl border border-dashed border-border bg-white p-4 text-sm text-text-secondary">
                    No tasks yet in this column.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
