import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Landmark, Mail, Lock, User, UserPlus, ArrowRight, ShieldCheck, CreditCard, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    universityId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create Profile in our custom Profiles table
        const { error: profileError } = await supabase
          .from('Profiles')
          .insert([{
            id: authData.user.id,
            full_name: formData.fullName,
            university_id: formData.universityId,
            email: formData.email
          }]);

        if (profileError) throw profileError;

        alert('Account created successfully! You can now sign in.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 grid grid-cols-1 lg:grid-cols-12 font-sans overflow-hidden">
      {/* Left Column: Register Card */}
      <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-16 xl:p-24 relative z-10 bg-white dark:bg-dark-900 shadow-2xl">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Link to="/login" className="inline-flex items-center gap-2 text-zinc-500 hover:text-usa-maroon dark:hover:text-usa-gold transition-colors font-bold text-sm group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-usa-maroon p-2 rounded-xl text-white">
                <UserPlus size={24} />
              </div>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Create an Account</h2>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">Join the University of San Agustin's official Lost & Found community.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-bold animate-in fade-in zoom-in-95">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-usa-maroon transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 dark:border-dark-700 bg-zinc-50 dark:bg-dark-800 text-zinc-900 dark:text-white font-semibold focus:ring-4 focus:ring-usa-maroon/10 focus:border-usa-maroon outline-none transition-all"
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Student / Employee ID</label>
                <div className="relative group">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-usa-maroon transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="2024-XXXX-XX"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 dark:border-dark-700 bg-zinc-50 dark:bg-dark-800 text-zinc-900 dark:text-white font-semibold focus:ring-4 focus:ring-usa-maroon/10 focus:border-usa-maroon outline-none transition-all"
                    onChange={(e) => setFormData({...formData, universityId: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">University Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-usa-maroon transition-colors" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="student@usa.edu.ph"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 dark:border-dark-700 bg-zinc-50 dark:bg-dark-800 text-zinc-900 dark:text-white font-semibold focus:ring-4 focus:ring-usa-maroon/10 focus:border-usa-maroon outline-none transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-usa-maroon transition-colors" size={18} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 dark:border-dark-700 bg-zinc-50 dark:bg-dark-800 text-zinc-900 dark:text-white font-semibold focus:ring-4 focus:ring-usa-maroon/10 focus:border-usa-maroon outline-none transition-all"
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Confirm</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-usa-maroon transition-colors" size={18} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-200 dark:border-dark-700 bg-zinc-50 dark:bg-dark-800 text-zinc-900 dark:text-white font-semibold focus:ring-4 focus:ring-usa-maroon/10 focus:border-usa-maroon outline-none transition-all"
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-usa-maroon hover:bg-usa-maroon-light text-white font-black text-lg shadow-xl shadow-usa-maroon/20 hover:shadow-usa-maroon/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm font-bold text-zinc-500 dark:text-zinc-400">
            Already have an account? <Link to="/login" className="text-usa-maroon dark:text-usa-gold hover:underline">Sign In here</Link>
          </p>
        </div>
      </div>

      {/* Right Column: Hero/Info */}
      <div className="lg:col-span-7 relative hidden lg:flex flex-col justify-end p-20 bg-usa-maroon overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-usa-maroon via-usa-maroon/60 to-transparent z-10" />
          <img 
            src="/assets/university_bg.png" 
            alt="University" 
            className="w-full h-full object-cover opacity-40 scale-110 group-hover:scale-100 transition-transform duration-[10s]"
          />
        </div>

        <div className="relative z-20 space-y-8 animate-in slide-in-from-right-10 duration-1000">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <Landmark size={24} className="text-usa-gold" />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.4em] text-usa-gold">Student Life Services</p>
          </div>
          <h2 className="text-6xl font-black text-white leading-tight">
            Security & <br />
            Peace of Mind.
          </h2>
          <p className="text-xl text-white/70 max-w-lg leading-relaxed font-medium">
            Join the thousand of Agustinians helping each other find and return items with total transparency and security.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-white tracking-wide">Campus Verified</span>
            </div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-usa-gold animate-pulse" />
              <span className="text-sm font-bold text-white tracking-wide">Official Platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
