import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, Users, BarChart3, Lock, Grid, Sparkles } from 'lucide-react';
import { apiClient } from '../api/axios.js';

const HomePage = () => {
  const [publicTasks, setPublicTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchPublicTasks();
    const interval = setInterval(fetchPublicTasks, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPublicTasks = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/tasks/public');
      if (response.data.success) {
        setPublicTasks(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch public tasks');
    } finally {
      setLoading(false);
    }
  };

  const toDo = publicTasks.filter(t => t.status === 'To Do');
  const inProgress = publicTasks.filter(t => t.status === 'In Progress');
  const review = publicTasks.filter(t => t.status === 'Review');
  const completed = publicTasks.filter(t => t.status === 'Completed');

  const TaskCard = ({ task }) => (
    <div className="rounded-lg bg-white border border-[#E2E4E9] p-3 cursor-default hover:shadow-md transition">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`text-xs font-bold uppercase px-2 py-1 rounded-md ${
          task.priority === 'Low' ? 'bg-[#DCFCE7] text-[#16A34A]' :
          task.priority === 'Medium' ? 'bg-[#FEF9C3] text-[#CA8A04]' :
          'bg-[#FEE2E2] text-[#DC2626]'
        }`}>
          {task.priority}
        </span>
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
          task.status === 'To Do' ? 'bg-[#64748B]' :
          task.status === 'In Progress' ? 'bg-[#2563EB]' :
          task.status === 'Review' ? 'bg-[#EA580C]' :
          'bg-[#16A34A]'
        }`}></span>
      </div>
      <h4 className="text-sm font-medium text-[#0F172A] line-clamp-2 mb-2">{task.title}</h4>
      <div className="flex items-center justify-between text-xs text-[#64748B]">
        <span>{task.assignedTo?.name || 'Unassigned'}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      {/* Navbar */}
      <nav className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'border-b border-[#E2E4E9]'
      }`} style={{ height: '60px' }}>
        <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF1FD] flex items-center justify-center text-[#2D6ADF] font-bold text-lg">DS</div>
            <span className="hidden sm:block text-lg font-bold font-[Plus Jakarta Sans] text-[#2D6ADF]">DevSync</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#475569] hover:text-[#2D6ADF] transition">Features</a>
            <a href="#solutions" className="text-sm text-[#475569] hover:text-[#2D6ADF] transition">Solutions</a>
            <a href="#tasks" className="text-sm text-[#475569] hover:text-[#2D6ADF] transition">Live Board</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-[#475569] hover:text-[#2D6ADF] transition">Login</Link>
            <Link to="/login?mode=register" className="text-sm font-semibold bg-[#2D6ADF] text-white px-4 py-2 rounded-lg hover:bg-[#1A56C4] transition">Sign Up Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold font-[Plus Jakarta Sans] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            All <span className="text-[#7C3AED]">Work</span>. <span className="text-[#2D6ADF]">All</span> <span className="text-[#16A34A]">Teams</span>. One Place.
          </motion.h1>
          <motion.p 
            className="text-xl text-[#475569] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Manage projects, track tasks, and ship faster with AI-powered sprint planning.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/login?mode=register" className="px-6 py-3 bg-[#2D6ADF] text-white font-semibold rounded-lg hover:bg-[#1A56C4] transition inline-flex items-center justify-center gap-2">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <button className="px-6 py-3 border-2 border-[#E2E4E9] text-[#0F172A] font-semibold rounded-lg hover:border-[#2D6ADF] hover:text-[#2D6ADF] transition">
              Watch Demo
            </button>
          </motion.div>
          <motion.p 
            className="text-sm text-[#475569] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Trusted by 10,000+ teams
          </motion.p>
          <motion.div 
            className="flex justify-center gap-4 mb-12 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {['TechCorp', 'InnovateLabs', 'DevStudio', 'CloudSys', 'BuildCo'].map((company) => (
              <div key={company} className="px-4 py-2 bg-[#E2E4E9] text-[#64748B] text-xs font-medium rounded-full">
                {company}
              </div>
            ))}
          </motion.div>

          {/* Browser Mockup */}
          <motion.div 
            className="rounded-2xl border-2 border-[#E2E4E9] overflow-hidden bg-white shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-[#F0F1F5] px-4 py-3 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="p-6 bg-[#FAFBFC] grid grid-cols-4 gap-3">
              {['To Do', 'In Progress', 'Review', 'Done'].map((col) => (
                <div key={col} className="space-y-3">
                  <div className="text-xs font-bold text-[#64748B] uppercase">{col}</div>
                  <div className="space-y-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-white border border-[#E2E4E9] rounded-lg p-2 text-xs text-[#475569]">
                        <div className="font-medium mb-1">Task title</div>
                        <div className="h-1 bg-[#E2E4E9] rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-[#F4F5F7]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className="text-4xl font-bold font-[Plus Jakarta Sans] text-[#0F172A] mb-4">A Complete Suite for Modern Work</h2>
            <p className="text-lg text-[#475569]">Everything you need to manage, track, and deliver projects faster</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Grid, title: 'Project Management', desc: 'Organize all your work in one powerful workspace' },
              { icon: Sparkles, title: 'AI Sprint Assistant', desc: 'Generate smart roadmaps and complexity scoring with AI' },
              { icon: BarChart3, title: 'Kanban Boards', desc: 'Visual workflow with drag-and-drop task management' },
              { icon: Users, title: 'Team Collaboration', desc: 'Assign tasks and keep everyone on the same page' },
              { icon: Zap, title: 'Analytics Dashboard', desc: 'Real-time metrics on team productivity and progress' },
              { icon: Lock, title: 'Role-Based Access', desc: 'Control who can create, edit, and delete tasks' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E2E4E9] hover:shadow-lg transition hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EBF1FD] flex items-center justify-center text-[#2D6ADF] mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#475569]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold font-[Plus Jakarta Sans] text-[#0F172A] mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            Solutions for Every Team
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Project Management', desc: 'Centralized workspace for all projects' },
                { title: 'Agile Development', desc: 'Sprint planning with AI-powered insights' },
                { title: 'Team Collaboration', desc: 'Real-time task updates and notifications' },
                { title: 'Remote Work', desc: 'Asynchronous workflows for distributed teams' },
                { title: 'Product Teams', desc: 'Roadmap planning and feature tracking' },
                { title: 'Marketing', desc: 'Campaign and content task management' }
              ].map((solution, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[#F4F5F7] rounded-xl p-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <h4 className="font-semibold text-[#0F172A] mb-1">{solution.title}</h4>
                  <p className="text-sm text-[#475569]">{solution.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="bg-[#EBF1FD] rounded-2xl p-8 border-2 border-[#2D6ADF]/20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-6">Workspace Preview</h3>
              <div className="space-y-3">
                {['Not Started', 'In Progress', 'Review', 'Done'].map((status, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 border border-[#2D6ADF]/10">
                    <div className="text-xs font-semibold text-[#64748B] mb-2">{status}</div>
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="bg-[#F0F1FF] rounded h-8 flex items-center px-2 text-xs text-[#475569]">
                          Sample Task {i}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Public Tasks Section */}
      <section id="tasks" className="py-20 px-6 bg-[#F4F5F7]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className="text-4xl font-bold font-[Plus Jakarta Sans] text-[#0F172A] mb-2">Live Project Board</h2>
            <p className="text-lg text-[#475569]">Tasks currently in progress across all teams</p>
          </motion.div>

          {publicTasks.length === 0 ? (
            <motion.div
              className="bg-white rounded-2xl p-12 text-center border border-[#E2E4E9]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <p className="text-[#475569] mb-4">No public tasks yet. Managers can mark tasks as public.</p>
              <Link to="/login?mode=register" className="inline-block px-4 py-2 bg-[#2D6ADF] text-white rounded-lg hover:bg-[#1A56C4] transition text-sm font-medium">
                Get Started
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              {/* To Do Column */}
              <div className="bg-white rounded-lg border border-[#E2E4E9]">
                <div className="p-4 border-b border-[#E2E4E9]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#64748B]"></span>
                    <span className="font-semibold text-[#0F172A] text-sm">To Do</span>
                  </div>
                  <span className="bg-[#F4F5F7] px-2 py-1 rounded text-xs text-[#64748B] font-medium">{toDo.length}</span>
                </div>
                <div className="p-4 space-y-3 min-h-[300px]">
                  {toDo.map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="bg-white rounded-lg border border-[#E2E4E9]">
                <div className="p-4 border-b border-[#E2E4E9]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                    <span className="font-semibold text-[#0F172A] text-sm">In Progress</span>
                  </div>
                  <span className="bg-[#F4F5F7] px-2 py-1 rounded text-xs text-[#64748B] font-medium">{inProgress.length}</span>
                </div>
                <div className="p-4 space-y-3 min-h-[300px]">
                  {inProgress.map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                </div>
              </div>

              {/* Review Column */}
              <div className="bg-white rounded-lg border border-[#E2E4E9]">
                <div className="p-4 border-b border-[#E2E4E9]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
                    <span className="font-semibold text-[#0F172A] text-sm">Review</span>
                  </div>
                  <span className="bg-[#F4F5F7] px-2 py-1 rounded text-xs text-[#64748B] font-medium">{review.length}</span>
                </div>
                <div className="p-4 space-y-3 min-h-[300px]">
                  {review.map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                </div>
              </div>

              {/* Completed Column */}
              <div className="bg-white rounded-lg border border-[#E2E4E9]">
                <div className="p-4 border-b border-[#E2E4E9]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                    <span className="font-semibold text-[#0F172A] text-sm">Completed</span>
                  </div>
                  <span className="bg-[#F4F5F7] px-2 py-1 rounded text-xs text-[#64748B] font-medium">{completed.length}</span>
                </div>
                <div className="p-4 space-y-3 min-h-[300px]">
                  {completed.map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Teams' },
              { value: '500,000+', label: 'Tasks Completed' },
              { value: '99.9%', label: 'Uptime' },
              { value: '4.9★', label: 'Rating' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <div className="text-5xl font-bold font-[Plus Jakarta Sans] text-[#2D6ADF] mb-2">{stat.value}</div>
                <div className="text-sm text-[#475569]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#2D6ADF] to-[#7C3AED]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h2
            className="text-4xl font-bold font-[Plus Jakarta Sans] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            Ready to Transform Your Workflow?
          </motion.h2>
          <motion.p
            className="text-lg mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            Join thousands of teams already using DevSync
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <Link to="/login?mode=register" className="px-6 py-3 bg-white text-[#2D6ADF] font-semibold rounded-lg hover:bg-opacity-90 transition inline-flex items-center justify-center gap-2">
              Sign Up Free <ArrowRight size={18} />
            </Link>
            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
              Book a Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-[#94A3B8] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#2D6ADF] flex items-center justify-center text-white font-bold text-sm">DS</div>
                <span className="font-semibold text-white">DevSync</span>
              </div>
              <p className="text-sm">Agile workflow management with AI sprint planning.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition">Kanban Board</a></li>
                <li><a href="#" className="hover:text-white transition">AI Assistant</a></li>
                <li><a href="#" className="hover:text-white transition">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Development Teams</a></li>
                <li><a href="#" className="hover:text-white transition">Product Management</a></li>
                <li><a href="#" className="hover:text-white transition">Marketing</a></li>
                <li><a href="#" className="hover:text-white transition">HR</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#2D6ADF]/30 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p>&copy; 2026 DevSync Workspace. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
