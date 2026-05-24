import { motion } from 'framer-motion';

const cards = [
  { title: 'Total Tasks', color: 'bg-[#EEF0FF]', icon: '📌', key: 'total' },
  { title: 'In Progress', color: 'bg-[#E3F2FD]', icon: '🚧', key: 'inProgress' },
  { title: 'Review Queue', color: 'bg-[#FFF8E1]', icon: '🧾', key: 'review' },
  { title: 'Completed', color: 'bg-[#E8F5E9]', icon: '✅', key: 'completed' }
];

export const MetricCards = ({ tasks }) => {
  const totals = {
    total: tasks.length,
    inProgress: tasks.filter((task) => task.status === 'In Progress').length,
    review: tasks.filter((task) => task.status === 'Review').length,
    completed: tasks.filter((task) => task.status === 'Completed').length
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.28 }}
          className="rounded-2xl border border-border bg-white p-5 shadow-soft"
        >
          <div className="flex items-center gap-4">
            <div className={`${card.color} flex h-12 w-12 items-center justify-center rounded-2xl text-xl`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-text-secondary">{card.title}</p>
              <p className="mt-2 text-3xl font-semibold text-text-primary">{totals[card.key]}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricCards;
