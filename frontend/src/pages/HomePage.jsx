import { Link } from 'react-router-dom';
import { TopHeader } from '../components/layout/TopHeader.jsx';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <TopHeader />
      <main className="mx-auto max-w-6xl p-6 md:p-12">
        <section className="rounded-3xl bg-white p-10 shadow-soft">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold font-[Plus Jakarta Sans] text-text-primary">DevSync Workspace</h1>
              <p className="mt-4 max-w-xl text-lg text-text-secondary">A lightweight Agile/Kanban planning workspace with integrated AI Sprint Assistant to help teams plan, score, and roadmap tasks more effectively.</p>
              <div className="mt-6 flex gap-3">
                <Link to="/login" className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-text-primary hover:bg-gray-50">Sign In</Link>
                <Link to="/login?mode=register" className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90">Create Account</Link>
              </div>
            </div>
            <div className="rounded-2xl bg-[#F7F8FA] p-6">
              <h3 className="text-lg font-semibold">What you get</h3>
              <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                <li>- Intuitive Kanban board with task lanes and drag & drop</li>
                <li>- Role-based controls for Managers and Developers</li>
                <li>- AI Sprint Assistant providing roadmap suggestions and complexity scoring</li>
                <li>- Team member directory and lightweight analytics</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <h4 className="font-semibold">AI Sprint Assistant</h4>
            <p className="mt-2 text-sm text-text-secondary">Generate suggested roadmaps, break down tasks, and get complexity estimates using integrated AI tools.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <h4 className="font-semibold">Kanban + Metrics</h4>
            <p className="mt-2 text-sm text-text-secondary">Track progress visually and use lightweight metrics to make planning decisions.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <h4 className="font-semibold">Team Collaboration</h4>
            <p className="mt-2 text-sm text-text-secondary">Invite team members, assign roles, and manage tasks together.</p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft">
          <h3 className="text-lg font-semibold">Quick Start</h3>
          <ol className="mt-3 space-y-2 text-sm text-text-secondary list-inside list-decimal">
            <li>Create an account (Manager or Developer)</li>
            <li>Create a team and invite members</li>
            <li>Add tasks, use the AI Assistant for planning, and move cards across the board</li>
            <li>Monitor simple metrics and iterate</li>
          </ol>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
