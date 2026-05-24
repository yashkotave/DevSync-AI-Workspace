import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { apiClient } from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTask } from '../../context/TaskContext.jsx';
import { toast } from 'react-hot-toast';

export const TaskDetailModal = ({ task, open, onClose }) => {
  const { user } = useAuth();
  const { deleteTask, fetchTasks } = useTask();
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [publicSaving, setPublicSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setAiData(task.aiRoadmap?.length ? {
        roadmap: task.aiRoadmap,
        skillTag: task.skillTag,
        complexityScore: task.complexityScore
      } : null);
      setIsPublic(Boolean(task.isPublic));
    }
  }, [task]);

  const handleGenerate = async () => {
    if (!task) return;
    setLoading(true);
    try {
      const response = await apiClient.post('/tasks/ai-optimize', {
        title: task.title,
        description: task.description
      });
      if (response.data.success) {
        setAiData(response.data.data);
        toast.success('AI insights generated');
      }
    } catch (error) {
      toast.error('AI generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!task || !aiData) return;
    setSaving(true);
    try {
      const response = await apiClient.put(`/tasks/${task._id}/ai-update`, aiData);
      if (response.data.success) {
        toast.success('AI insights saved');
        fetchTasks();
      }
    } catch (error) {
      toast.error('Unable to save AI data');
    } finally {
      setSaving(false);
    }
  };

  const handlePublicToggle = async () => {
    if (!task) return;
    setPublicSaving(true);
    try {
      const response = await apiClient.put(`/tasks/${task._id}`, { isPublic: !isPublic });
      if (response.data.success) {
        toast.success(`Task ${!isPublic ? 'published' : 'removed from public board'}`);
        setIsPublic(!isPublic);
        fetchTasks();
      }
    } catch (error) {
      toast.error('Unable to update public visibility');
    } finally {
      setPublicSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    await deleteTask(task._id);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && task && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-pop"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold font-[Plus Jakarta Sans] text-text-primary">Task Details</p>
                <p className="text-sm text-text-secondary">Deep dive into the task and generate AI sprint guidance.</p>
              </div>
              <button onClick={onClose} className="rounded-full p-2 text-text-secondary transition hover:bg-surface hover:text-primary">
                <X size={20} />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-white p-5">
                <h2 className="text-lg font-semibold text-text-primary">{task.title}</h2>
                <p className="mt-3 text-sm leading-6 text-text-secondary">{task.description}</p>
                <div className="mt-5 space-y-3 text-sm text-text-secondary">
                  <div className="flex items-center justify-between rounded-2xl bg-[#F7F8FA] px-4 py-3">
                    <span>Status</span>
                    <span className="font-semibold text-text-primary">{task.status}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-[#F7F8FA] px-4 py-3">
                    <span>Priority</span>
                    <span className="font-semibold text-text-primary">{task.priority}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-[#F7F8FA] px-4 py-3">
                    <span>Assigned To</span>
                    <span className="font-semibold text-text-primary">{task.assignedTo?.name}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-[#F8F9FF] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-text-primary">AI Sprint Assistant</p>
                    <p className="mt-1 text-sm text-text-secondary">Generate or refresh task suggestions for the team.</p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">AI</div>
                </div>
                <div className="mt-6 space-y-4">
                  {loading ? (
                    <div className="space-y-3">
                      <div className="h-4 w-3/4 rounded-full bg-[#DEE2FF] animate-pulse"></div>
                      <div className="h-4 w-1/2 rounded-full bg-[#DEE2FF] animate-pulse"></div>
                      <div className="h-24 rounded-3xl bg-[#DEE2FF] animate-pulse"></div>
                    </div>
                  ) : aiData ? (
                    <div className="space-y-4">
                      <div className="rounded-3xl border border-[#C5CAE9] bg-white p-4">
                        {aiData.roadmap.map((step, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">{idx + 1}</div>
                            <p className="text-sm text-text-secondary">{step}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between rounded-3xl bg-white p-4">
                        <span className="text-sm text-text-secondary">Skill Tag</span>
                        <span className="rounded-full bg-[#EEF0FF] px-3 py-1 text-sm font-semibold text-primary">{aiData.skillTag}</span>
                      </div>
                      <div className="space-y-2 rounded-3xl bg-white p-4">
                        <div className="flex items-center justify-between text-sm text-text-secondary">
                          <span>Complexity</span>
                          <span className="font-semibold text-text-primary">{aiData.complexityScore}/10</span>
                        </div>
                        <div className="h-3 rounded-full bg-[#E8EAED]">
                          <div className="h-3 rounded-full bg-primary" style={{ width: `${Math.min(aiData.complexityScore * 10, 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-[#C5CAE9] bg-white p-5 text-sm text-text-secondary">
                      Generate intelligent sprint recommendations for this task.
                    </div>
                  )}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleGenerate}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-[#7986CB] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    <Sparkles size={16} />
                    {aiData ? 'Regenerate' : 'Generate AI Insights'}
                  </button>
                  {aiData && (
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center justify-center rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-text-secondary transition hover:border-primary hover:text-primary disabled:opacity-60"
                    >
                      Save to Task
                    </button>
                  )}
                </div>
              </div>
            </div>
            {user.role === 'Manager' && (
              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] items-center">
                <button
                  type="button"
                  onClick={handlePublicToggle}
                  disabled={publicSaving}
                  className="rounded-2xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text-secondary transition hover:border-primary hover:text-primary disabled:opacity-60"
                >
                  {isPublic ? 'Remove from Public Board' : 'Show on Public Board'}
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-2xl bg-[#FBE9E7] px-5 py-3 text-sm font-semibold text-[#C62828] transition hover:bg-[#F8B4AF]"
                >
                  Delete Task
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskDetailModal;
