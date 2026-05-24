import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { apiClient } from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-hot-toast';
import { BrandLogo } from '../components/BrandLogo.jsx';

const homeContainerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.06 }
  }
};

const homeItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
};

const LoginPage = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Developer');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'register') setLoginMode(false);
  }, [location.search]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const endpoint = loginMode ? '/auth/login' : '/auth/register';
      const payload = loginMode ? { email, password } : { name, email, password, role };
      const response = await apiClient.post(endpoint, payload);
      if (response.data.success) {
        login(response.data.data);
        toast.success(response.data.message);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-surface px-4 py-10 md:px-8"
      initial="hidden"
      animate="visible"
      variants={homeContainerVariants}
    >
      <motion.div
        className="mx-auto max-w-3xl rounded-[32px] border border-border bg-white p-8 shadow-soft"
        variants={homeItemVariants}
      >
        <motion.div className="mb-8 flex flex-col items-center justify-center gap-3 text-center" variants={homeItemVariants}>
          <BrandLogo />
          <p className="max-w-xl text-sm text-text-secondary">Enterprise-grade Agile planning with AI-powered sprint assistance.</p>
        </motion.div>

        <motion.div className="mb-6 flex items-center justify-center gap-2 rounded-3xl bg-surface p-2" variants={homeItemVariants}>
          <button
            onClick={() => setLoginMode(true)}
            className={`w-1/2 rounded-2xl py-3 text-sm font-semibold transition ${loginMode ? 'bg-white text-primary shadow-soft' : 'text-text-secondary hover:text-primary'}`}
          >
            Login
          </button>
          <button
            onClick={() => setLoginMode(false)}
            className={`w-1/2 rounded-2xl py-3 text-sm font-semibold transition ${!loginMode ? 'bg-white text-primary shadow-soft' : 'text-text-secondary hover:text-primary'}`}
          >
            Register
          </button>
        </motion.div>

        <motion.form className="space-y-5" onSubmit={handleSubmit} variants={homeItemVariants}>
          {!loginMode && (
            <motion.div variants={homeItemVariants}>
              <label className="mb-2 block text-sm font-semibold text-text-secondary">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Full name"
              />
            </motion.div>
          )}
          <motion.div variants={homeItemVariants}>
            <label className="mb-2 block text-sm font-semibold text-text-secondary">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="you@example.com"
            />
          </motion.div>
          <motion.div variants={homeItemVariants}>
            <label className="mb-2 block text-sm font-semibold text-text-secondary">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter password"
            />
          </motion.div>
          {!loginMode && (
            <motion.div variants={homeItemVariants}>
              <label className="mb-2 block text-sm font-semibold text-text-secondary">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Developer">Developer</option>
                <option value="Manager">Manager</option>
              </select>
            </motion.div>
          )}
          <motion.div variants={homeItemVariants}>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
            >
              {loginMode ? 'Sign In' : 'Create Account'}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
