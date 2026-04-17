import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export default function Shop() {
  const { user } = useAppStore();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center">
      <p className="text-primary text-xs tracking-[0.4em] uppercase font-serif mb-6">Welcome</p>
      <h1 className="text-4xl md:text-6xl font-serif tracking-wide mb-6">
        THE COLLECTION
      </h1>
      <p className="text-muted-foreground font-light max-w-md leading-loose mb-10">
        {user?.email ? `Signed in as ${user.email}.` : ''} The AVELLIN shop is being curated. Check back soon.
      </p>
      <Link
        to="/"
        className="text-xs tracking-widest uppercase font-serif text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
