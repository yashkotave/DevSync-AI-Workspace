import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const priorityStyles = {
  Low: 'bg-[#E8F5E9] text-[#43A047]',
  Medium: 'bg-[#FFF3E0] text-[#FB8C00]',
  High: 'bg-[#FFEBEE] text-[#E53935]'
};

const statuses = ['To Do', 'In Progress', 'Review', 'Completed'];

export const TaskCard = ({ task, onSelect, onUpdateStatus }) => {
  const currentIndex = statuses.indexOf(task.status);
  const canMoveLeft = currentIndex > 0;
  const canMoveRight = currentIndex < statuses.length - 1;

  return (
    <motion.div
      whileHover={{ y: -1, boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="group rounded-2xl border border-border bg-white p-4 transition duration-150"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${priorityStyles[task.priority]}`}>
              {task.priority}
            </span>
            {task.aiRoadmap?.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary">
                <Sparkles size={12} /> AI
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-text-primary">{task.title}</h3>
          <p className="mt-2 text-sm leading-5 text-text-secondary line-clamp-2">{task.description}</p>
        </div>
        <div className="space-y-2 text-right">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F1F3FF] text-primary">{task.complexityScore || '-'}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
            {task.assignedTo?.name
              ? task.assignedTo.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
              : 'TS'}
          </div>
          <span>{task.assignedTo?.name || 'Unassigned'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(event) => {
              event.stopPropagation();
              if (canMoveLeft) onUpdateStatus(task._id, statuses[currentIndex - 1]);
            }}
            disabled={!canMoveLeft}
            className="rounded-xl p-2 text-text-secondary transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              if (canMoveRight) onUpdateStatus(task._id, statuses[currentIndex + 1]);
            }}
            disabled={!canMoveRight}
            className="rounded-xl p-2 text-text-secondary transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
