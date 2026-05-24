import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { apiClient } from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTask } from '../../context/TaskContext.jsx';
import { toast } from 'react-hot-toast';

export const CreateTaskModal = ({ open, onClose }) => {
  const { user } = useAuth();
  const { createTask, setIsCreateModalOpen } = useTask();
  const [team, setTeam] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (!open) return;
    const fetchTeam = async () => {
      try {
        const response = await apiClient.get('/auth/team');
        if (response.data.success) {
          setTeam(response.data.data);
          setAssignedTo(response.data.data[0]?._id || '');
        }
      } catch (error) {
        toast.error('Unable to load team members');
      }
    };
    fetchTeam();
  }, [open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !description || !assignedTo) {
      toast.error('Please fill all fields');
      return;
    }
    setSubmitting(true);
    try {
      await createTask({ title, description, priority, assignedTo, isPublic });
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setAssignedTo(team[0]?._id || '');
      setIsPublic(false);
      setIsCreateModalOpen(false);
      onClose();
    } catch (error) {
      // handled by context
    } finally {
      setSubmitting(false);
    }
  };

  if (!open || user.role !== 'Manager') return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-pop"
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 22, opacity: 0 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold font-[Plus Jakarta Sans] text-text-primary">Create New Task</h2>
                <p className="text-sm text-text-secondary">Assign work quickly with clear Agile task details.</p>
              </div>
              <button onClick={onClose} className="rounded-full p-2 text-text-secondary transition hover:bg-surface hover:text-primary">
                <X size={20} />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-secondary">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Task title"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-text-secondary">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Task description"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-text-secondary">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-text-secondary">Assign To</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {team.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name} • {member.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="rounded-3xl border border-[#E2E4E9] bg-[#F9FAFB] p-4 flex items-center gap-3">
                <input
                  id="publicToggle"
                  type="checkbox"
                  checked={isPublic}
                  onChange={(event) => setIsPublic(event.target.checked)}
                  className="h-4 w-4 rounded border border-border text-primary focus:ring-primary"
                />
                <label htmlFor="publicToggle" className="text-sm text-text-secondary">
                  Show this task on the public homepage board
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text-secondary transition hover:border-primary hover:text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
                >
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateTaskModal;
