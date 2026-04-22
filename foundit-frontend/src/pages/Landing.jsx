import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth logic
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email || 'student@usa.edu.ph');
      navigate('/');
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-dark-900 font-sans selection:bg-usa-maroon/20 selection:text-usa-maroon">
      {/* Left Column: Hero & Branding */}
      <div className="lg:col-span-7 relative hidden lg:flex flex-col justify-between p-16 overflow-hidden bg-usa-maroon">
        {/* Background Overlay with Gradient and Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-usa-maroon via-usa-maroon/90 to-usa-maroon-light opacity-95" />
          <img 
            src="/assets/university_bg.png" 
            alt="University Background" 
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>

        {/* Branding */}
        <div className="relative z-10 flex items-center gap-4 transition-transform hover:scale-105 duration-500 cursor-default">
          <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 shadow-2xl">
            <Landmark size={32} className="text-usa-gold" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight leading-none">FoundiT</h1>
            <p className="text-[12px] uppercase tracking-[0.3em] text-usa-gold font-black mt-1">University of San Agustin</p>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8">
            Your lost items, <br />
            <span className="text-usa-gold">reunited.</span>
          </h2>
          <p className="text-xl text-white/80 leading-relaxed font-medium">
            The official digital hub for managing and recovering lost personal property 
            within the Augustinian campus community. Fast, secure, and reliable.
          </p>
          
          <div className="flex items-center gap-8 mt-12">
            <div className="flex flex-col">
              <span className="text-4xl font-black text-white">2.4k+</span>
              <span className="text-sm text-usa-gold font-bold uppercase tracking-widest mt-1">Total Reports</span>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="flex flex-col">
              <span className="text-4xl font-black text-white">850+</span>
              <span className="text-sm text-usa-gold font-bold uppercase tracking-widest mt-1">Items Reunited</span>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="relative z-10 flex items-center gap-4 text-white/50 text-sm font-medium">
          <ShieldCheck size={18} className="text-usa-gold" />
          <span>© 2024 FoundiT School Ecosystem. Managed by Student Affairs.</span>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-16 xl:p-24 bg-white dark:bg-dark-900">
        <div className="max-w-md w-full mx-auto space-y-10">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <Landmark size={28} className="text-usa-maroon dark:text-usa-gold" />
            <span className="text-2xl font-black dark:text-white">FoundiT</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">Welcome back</h3>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg leading-relaxed">
              Sign in to your student portal to manage your lost & found items.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-1">
                  University Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-usa-maroon transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 dark:border-dark-700 bg-zinc-50 dark:bg-dark-800 text-zinc-900 dark:text-white font-semibold focus:ring-4 focus:ring-usa-maroon/10 focus:border-usa-maroon dark:focus:border-usa-gold/50 outline-none transition-all"
                    placeholder="you@usa.edu.ph"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    Password
                  </label>
                  <a href="#" className="text-xs font-bold text-usa-maroon dark:text-usa-gold hover:underline">Forgot?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-usa-maroon transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 rounded-xl border border-zinc-200 dark:border-dark-700 bg-zinc-50 dark:bg-dark-800 text-zinc-900 dark:text-white font-semibold focus:ring-4 focus:ring-usa-maroon/10 focus:border-usa-maroon dark:focus:border-usa-gold/50 outline-none transition-all"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-usa-maroon hover:bg-usa-maroon-light dark:bg-usa-maroon text-white font-black text-lg shadow-xl shadow-usa-maroon/20 hover:shadow-usa-maroon/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-70"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative pt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-dark-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-black">
              <span className="bg-white dark:bg-dark-900 px-4 text-zinc-400 dark:text-zinc-500">New to FoundiT?</span>
            </div>
          </div>

          <button 
            type="button"
            className="w-full py-4 rounded-xl border-2 border-zinc-200 dark:border-dark-700 hover:border-usa-maroon dark:hover:border-usa-gold bg-transparent text-zinc-900 dark:text-white font-black text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            Create your account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-usa-maroon dark:text-usa-gold" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-8">
            <a href="#" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-usa-maroon dark:hover:text-usa-gold transition-colors">Privacy Policy</a>
            <a href="#" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-usa-maroon dark:hover:text-usa-gold transition-colors">Terms of Service</a>
            <a href="#" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-usa-maroon dark:hover:text-usa-gold transition-colors">Contact Security</a>
          </div>
        </div>
      </div>
    </div>
  );
}
