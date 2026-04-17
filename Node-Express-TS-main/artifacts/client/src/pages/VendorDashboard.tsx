import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export default function VendorDashboard() {
  const { user } = useAppStore();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center">
      <p className="text-emerald-500 text-xs tracking-[0.4em] uppercase font-serif mb-6">Brand Portal</p>
      <h1 className="text-4xl md:text-6xl font-serif tracking-wide mb-6">
        VENDOR DASHBOARD
      </h1>
      <p className="text-muted-foreground font-light max-w-md leading-loose mb-10">
        {user?.email ? `Welcome, ${user.email}.` : ''} Your brand management suite is being configured. You will receive an invitation shortly.
      </p>
      <Link
        to="/"
        className="text-xs tracking-widest uppercase font-serif text-emerald-500 border-b border-emerald-700/40 pb-1 hover:border-emerald-500 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
