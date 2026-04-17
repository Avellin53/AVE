import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, Check } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';

/* ─── Animation variants ─────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.65, 0.3, 0.9] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/* ─── Types ──────────────────────────────────────────────────────────── */

type Role = 'BUYER' | 'VENDOR';
type View = 'register' | 'login';

/* ─── Helpers ────────────────────────────────────────────────────────── */

function generateSlug(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

interface PasswordStrength {
  score: number; // 0-4
  checks: { label: string; pass: boolean }[];
}

function checkPassword(pw: string): PasswordStrength {
  const checks = [
    { label: 'At least 8 characters', pass: pw.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(pw) },
    { label: 'Lowercase letter', pass: /[a-z]/.test(pw) },
    { label: 'Number or symbol', pass: /[0-9!@#$%^&*]/.test(pw) },
  ];
  return { score: checks.filter((c) => c.pass).length, checks };
}

const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
const strengthColor = [
  'bg-red-600',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-emerald-500',
  'bg-emerald-400',
];

/* ─── Shared field component ─────────────────────────────────────────── */

function Field({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  hint,
  suffix,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  suffix?: React.ReactNode;
  autoComplete?: string;
}) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
      <label className="text-[10px] tracking-[0.3em] uppercase font-serif text-muted-foreground">
        {label}
      </label>
      <div className="relative flex items-center border-b border-white/15 focus-within:border-primary transition-colors duration-300">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="flex-1 bg-transparent py-3 text-sm font-light text-foreground focus:outline-none placeholder:text-muted-foreground/30"
        />
        {suffix && <div className="ml-2">{suffix}</div>}
      </div>
      {hint && <p className="text-[11px] text-muted-foreground/50 font-light">{hint}</p>}
    </motion.div>
  );
}

/* ─── Error banner ───────────────────────────────────────────────────── */

function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-3 border border-destructive/30 bg-destructive/5 px-4 py-3"
    >
      <AlertCircle size={14} className="text-destructive mt-0.5 flex-shrink-0" />
      <p className="text-sm font-light text-destructive/90 leading-relaxed">{message}</p>
    </motion.div>
  );
}

/* ─── Left decorative panel ──────────────────────────────────────────── */

function LeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] flex-col justify-between relative bg-card border-r border-white/5 p-12 xl:p-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-800/40 to-transparent" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-900/10 blur-3xl pointer-events-none" />
      <div className="absolute -top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <Link to="/" className="text-xl tracking-[0.3em] font-serif text-foreground">
        AVELLIN
      </Link>

      <div>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-4 h-[1px] bg-emerald-700" />
          <div className="w-8 h-[1px] bg-primary" />
        </div>
        <h2 className="text-4xl xl:text-5xl font-serif tracking-wide leading-[1.15] mb-8 text-foreground/90">
          DRESS THE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/80 to-emerald-600/70 italic">
            BOARDROOM.
          </span>
        </h2>
        <p className="text-muted-foreground font-light leading-loose text-sm max-w-xs">
          Join a private network of Nigeria's most discerning professionals and the luxury brands that serve them.
        </p>
      </div>

      <div className="space-y-6">
        {[
          { label: 'Bespoke Corporate Wear', sub: 'Hand-tailored for the African executive' },
          { label: 'Botanical Skincare', sub: 'Formulated with continent-sourced ingredients' },
          { label: 'Private Ateliers', sub: 'Lagos, London & Dubai' },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <div className="w-1 h-1 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
            <div>
              <p className="text-xs font-serif tracking-widest uppercase text-foreground/70">{item.label}</p>
              <p className="text-xs text-muted-foreground/60 font-light mt-0.5">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground/30 font-light">
        &copy; {new Date().getFullYear()} AVELLIN. Lagos &bull; London &bull; Dubai
      </p>
    </div>
  );
}

/* ─── Register form ──────────────────────────────────────────────────── */

function RegisterForm({ onSuccess }: { onSuccess: (email: string) => void }) {
  const [role, setRole] = useState<Role>('BUYER');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [storeSlug, setStoreSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strength = checkPassword(password);

  const handleBrandName = (name: string) => {
    setBrandName(name);
    if (!slugEdited) setStoreSlug(generateSlug(name));
  };
  const handleSlug = (s: string) => {
    setSlugEdited(true);
    setStoreSlug(s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  };
  const handleRoleSwitch = (r: Role) => { setRole(r); setError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (strength.score < 3) {
      setError('Please choose a stronger password before continuing.');
      return;
    }

    setLoading(true);
    try {
      const supabase = await getSupabaseClient();

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });

      if (authError) {
        const msg = authError.message.toLowerCase();
        if (msg.includes('already registered') || msg.includes('user already exists')) {
          setError('An account with this address already exists. Please sign in instead.');
        } else {
          setError(authError.message);
        }
        return;
      }

      if (!authData.user) {
        setError('Something went wrong. Please try again.');
        return;
      }

      const userId = authData.user.id;

      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        email,
        full_name: fullName,
        role,
      });

      if (profileError) { setError(profileError.message); return; }

      if (role === 'VENDOR') {
        const { error: vendorError } = await supabase.from('vendor_profiles').insert({
          id: userId,
          brand_name: brandName,
          store_slug: storeSlug,
        });

        if (vendorError) {
          setError(
            vendorError.message.includes('unique')
              ? 'That store URL is already taken. Please choose a different one.'
              : vendorError.message,
          );
          return;
        }
      }

      onSuccess(email);
    } catch {
      setError('Unable to connect. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div key="register" initial="hidden" animate="visible" exit={{ opacity: 0, y: -16 }} variants={stagger}>
      <motion.div variants={fadeUp} className="mb-10">
        <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-serif mb-3">Create Your Account</p>
        <h1 className="text-3xl font-serif tracking-wide">JOIN THE CIRCLE</h1>
      </motion.div>

      {/* Role toggle */}
      <motion.div variants={fadeUp} className="mb-10">
        <div className="flex border border-white/10 p-0.5 relative">
          {(['BUYER', 'VENDOR'] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRoleSwitch(r)}
              className={`flex-1 py-3 text-[10px] tracking-[0.25em] uppercase font-serif transition-all duration-300 relative z-10 ${
                role === r
                  ? r === 'BUYER' ? 'text-primary-foreground' : 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {role === r && (
                <motion.span
                  layoutId="roleHighlight"
                  className={`absolute inset-0 ${r === 'BUYER' ? 'bg-primary' : 'bg-emerald-700'}`}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative">{r === 'BUYER' ? 'Premium Buyer' : 'Luxury Brand'}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={role}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-[11px] text-muted-foreground/50 font-light mt-2 pl-1"
          >
            {role === 'BUYER'
              ? 'Access exclusive collections and curated skincare lines.'
              : "List your brand and reach Nigeria's corporate elite."}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div variants={stagger} className="space-y-7">
          <Field label="Full Name" value={fullName} onChange={setFullName} placeholder="Adaeze Okonkwo" autoComplete="name" />
          <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="adaeze@example.com" autoComplete="email" />

          {/* Password + strength */}
          <motion.div variants={fadeUp} className="space-y-3">
            <Field
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              suffix={
                <button type="button" onClick={() => setShowPassword((p) => !p)} className="text-muted-foreground/50 hover:text-muted-foreground transition-colors" tabIndex={-1}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
            />
            {password.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${i < strength.score ? strengthColor[strength.score] : 'bg-white/10'}`} />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-[10px] font-serif tracking-widest uppercase ${strength.score >= 3 ? 'text-emerald-500' : 'text-muted-foreground/60'}`}>
                    {strengthLabel[strength.score]}
                  </p>
                  <div className="flex gap-3">
                    {strength.checks.map((c) => (
                      <span key={c.label} className={`text-[10px] flex items-center gap-1 ${c.pass ? 'text-emerald-500' : 'text-muted-foreground/30'}`}>
                        <Check size={9} />
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Vendor-only fields */}
          <AnimatePresence>
            {role === 'VENDOR' && (
              <motion.div
                key="vendor-fields"
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="overflow-hidden space-y-7"
              >
                <div className="pt-2 border-t border-white/5">
                  <p className="text-[10px] tracking-[0.3em] uppercase font-serif text-emerald-500/70 mb-5">Brand Details</p>
                  <div className="space-y-7">
                    <Field label="Brand Name" value={brandName} onChange={handleBrandName} placeholder="Eko Luxe Atelier" autoComplete="organization" />
                    <Field label="Store URL" value={storeSlug} onChange={handleSlug} placeholder="eko-luxe-atelier" hint={`avellin.ng/brands/${storeSlug || 'your-brand'}`} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>{error && <ErrorBanner key="err" message={error} />}</AnimatePresence>

          <motion.div variants={fadeUp} className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-xs tracking-widest uppercase font-serif flex items-center justify-center gap-3 transition-all duration-500 group disabled:opacity-50 ${
                role === 'BUYER'
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-emerald-800 text-white hover:bg-emerald-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <span className="w-3 h-3 border border-current/40 border-t-current rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>
                  {role === 'BUYER' ? 'Join as Premium Buyer' : 'Register Your Brand'}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );
}

/* ─── Login form ─────────────────────────────────────────────────────── */

function LoginForm({ prefillEmail }: { prefillEmail?: string }) {
  const navigate = useNavigate();
  const { setUser, setSession, setUserRole } = useAppStore();

  const [email, setEmail] = useState(prefillEmail ?? '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = await getSupabaseClient();

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        const msg = authError.message.toLowerCase();
        if (msg.includes('invalid') || msg.includes('credentials') || msg.includes('password')) {
          setError('Incorrect email or password. Please check your details and try again.');
        } else if (msg.includes('email not confirmed')) {
          setError('Please confirm your email address before signing in. Check your inbox.');
        } else {
          setError(authError.message);
        }
        return;
      }

      if (!authData.user || !authData.session) {
        setError('Sign in failed. Please try again.');
        return;
      }

      // Fetch the user's role from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile) {
        setError('Your profile could not be found. Please contact support.');
        return;
      }

      setUser(authData.user);
      setSession(authData.session);
      setUserRole(profile.role as 'BUYER' | 'VENDOR');

      navigate(profile.role === 'BUYER' ? '/shop' : '/vendor-dashboard');
    } catch {
      setError('Unable to connect. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div key="login" initial="hidden" animate="visible" exit={{ opacity: 0, y: -16 }} variants={stagger}>
      <motion.div variants={fadeUp} className="mb-10">
        <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-serif mb-3">Welcome Back</p>
        <h1 className="text-3xl font-serif tracking-wide">SIGN IN</h1>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div variants={stagger} className="space-y-7">
          <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="adaeze@example.com" autoComplete="email" />
          <Field
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
            placeholder="Your password"
            autoComplete="current-password"
            suffix={
              <button type="button" onClick={() => setShowPassword((p) => !p)} className="text-muted-foreground/50 hover:text-muted-foreground transition-colors" tabIndex={-1}>
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            }
          />

          <AnimatePresence>{error && <ErrorBanner key="err" message={error} />}</AnimatePresence>

          <motion.div variants={fadeUp} className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-xs tracking-widest uppercase font-serif bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <span className="w-3 h-3 border border-current/40 border-t-current rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );
}

/* ─── Registration success banner ────────────────────────────────────── */

function SuccessBanner({ email, onDismiss }: { email: string; onDismiss: () => void }) {
  React.useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex items-start gap-3 border border-emerald-800/50 bg-emerald-950/40 px-5 py-4"
    >
      <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm font-serif tracking-wide text-emerald-300">Account Created</p>
        <p className="text-xs text-muted-foreground/70 font-light mt-1 leading-relaxed">
          Welcome to AVELLIN. A confirmation may have been sent to{' '}
          <span className="text-foreground/80">{email}</span>.{' '}
          Please sign in below to access your account.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────── */

export default function Register() {
  const [view, setView] = useState<View>('register');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegistrationSuccess = (email: string) => {
    setRegisteredEmail(email);
    setShowSuccess(true);
    setView('login');
  };

  const dismissSuccess = () => setShowSuccess(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      <LeftPanel />

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 overflow-y-auto">
        {/* Mobile logo */}
        <Link to="/" className="lg:hidden text-xl tracking-[0.3em] font-serif text-foreground mb-12">
          AVELLIN
        </Link>

        <div className="w-full max-w-md">
          {/* Success banner */}
          <AnimatePresence>
            {showSuccess && (
              <SuccessBanner key="success" email={registeredEmail} onDismiss={dismissSuccess} />
            )}
          </AnimatePresence>

          {/* View toggle tabs */}
          <div className="flex gap-8 mb-12 border-b border-white/10">
            {(['register', 'login'] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => { setView(v); setShowSuccess(false); }}
                className={`pb-4 text-[10px] tracking-[0.3em] uppercase font-serif transition-colors duration-300 relative ${
                  view === v ? 'text-foreground' : 'text-muted-foreground/50 hover:text-muted-foreground'
                }`}
              >
                {v === 'register' ? 'New Account' : 'Sign In'}
                {view === v && (
                  <motion.div
                    layoutId="viewUnderline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Form area */}
          <AnimatePresence mode="wait">
            {view === 'register' ? (
              <RegisterForm key="reg" onSuccess={handleRegistrationSuccess} />
            ) : (
              <LoginForm key="log" prefillEmail={registeredEmail} />
            )}
          </AnimatePresence>

          {/* Footer toggle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-muted-foreground/50 font-light mt-10"
          >
            {view === 'register' ? (
              <>
                Already a member?{' '}
                <button type="button" onClick={() => setView('login')} className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
                  Sign in
                </button>
              </>
            ) : (
              <>
                New to AVELLIN?{' '}
                <button type="button" onClick={() => setView('register')} className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
                  Create an account
                </button>
              </>
            )}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
