import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Developer');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    <div className="min-h-screen bg-surface px-4 py-10 md:px-8">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-border bg-white p-8 shadow-soft">
        <div className="mb-8 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary text-3xl font-bold">DS</div>
          <h1 className="text-3xl font-bold font-[Plus Jakarta Sans] text-text-primary">DevSync Workspace</h1>
          <p className="max-w-xl text-sm text-text-secondary">A light, professional Agile planning workspace with AI-powered sprint assistance.</p>
        </div>

        <div className="mb-6 flex items-center justify-center gap-2 rounded-3xl bg-surface p-2">
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
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!loginMode && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-text-secondary">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Full name"
              />
            </div>
          )}
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-secondary">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-text-secondary">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter password"
            />
          </div>
          {!loginMode && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-text-secondary">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Developer">Developer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            {loginMode ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
