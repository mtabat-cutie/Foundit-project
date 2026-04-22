import { LogOut, ArrowLeft, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignOut() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-dark-900 flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full space-y-10 group">
        {/* Animated Icon Container */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-usa-maroon/10 dark:bg-usa-gold/10 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-sm" />
          <div className="absolute inset-0 bg-usa-maroon/5 dark:bg-usa-gold/5 rounded-3xl -rotate-6 group-hover:-rotate-12 transition-transform duration-500 shadow-sm" />
          <div className="relative w-24 h-24 bg-white dark:bg-dark-800 rounded-2xl shadow-xl flex items-center justify-center text-usa-maroon dark:text-usa-gold border border-zinc-100 dark:border-dark-700">
            <LogOut size={44} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
            Successfully <br /> 
            <span className="text-usa-maroon dark:text-usa-gold">Signed Out</span>
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-[280px] mx-auto">
            Your session has been securely ended. Thank you for being a part of our campus safety community.
          </p>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 gap-4 pt-4">
          <button 
            onClick={() => navigate('/login')}
            className="w-full py-4 rounded-xl bg-usa-gold hover:bg-[#E6C200] text-usa-maroon font-black text-lg shadow-xl shadow-usa-gold/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            Return to Login
          </button>
          <Link 
            to="/"
            className="w-full py-4 rounded-xl bg-transparent border-2 border-zinc-200 dark:border-dark-700 hover:border-usa-maroon dark:hover:border-usa-gold text-zinc-900 dark:text-white font-black text-lg transition-all flex items-center justify-center gap-3 group"
          >
            <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" /> BACK TO HOME
          </Link>
        </div>

        {/* Stats Footer (Minimal) */}
        <div className="pt-12 grid grid-cols-2 gap-4 border-t border-zinc-200 dark:border-dark-700 opacity-60">
          <div className="text-center group/stat">
            <p className="text-2xl font-black dark:text-white">1,240</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Items Reunited</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black dark:text-white">24/7</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Security Monitoring</p>
          </div>
        </div>

        {/* University Footer */}
        <div className="pt-8 flex flex-col items-center gap-4">
           <div className="flex items-center gap-2 opacity-50">
             <div className="bg-usa-maroon p-1 rounded text-white"><ArrowLeft size={12} /></div>
             <span className="text-[10px] font-bold uppercase tracking-widest">FoundiT Portal</span>
           </div>
           <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold max-w-[240px] leading-relaxed">
             © 2024 FoundiT School Ecosystem. All rights reserved. Providing a secure and reliable way to recover lost belongings across the campus.
           </p>
        </div>
      </div>
    </div>
  );
}
