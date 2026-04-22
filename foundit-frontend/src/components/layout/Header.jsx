import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, Landmark, User, LogOut, ChevronDown, Bell, Home, PlusCircle, Package, CheckCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const userEmail = localStorage.getItem('userEmail') || 'student@usa.edu.ph';

  useEffect(() => {
    // Theme initialization - default to light if not set to match screenshot
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/signed-out');
    window.dispatchEvent(new Event('storage'));
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Report Found Item', path: '/report-found', icon: PlusCircle },
    { name: 'Receive Items', path: '/browse', icon: Package },
    { name: 'Reunited', path: '/claims', icon: CheckCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-usa-maroon text-white shadow-md border-b-4 border-usa-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="bg-white/10 p-1.5 rounded-lg border border-white/20">
              <Landmark size={28} className="text-usa-gold" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-black tracking-tight leading-none uppercase">USA Lost & Found</h1>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-usa-gold font-bold">University of San Agustin</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-[13px] font-bold px-4 py-2 rounded-lg transition-all ${
                  location.pathname === link.path 
                    ? 'bg-white/20 text-usa-gold' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all active:scale-[0.98]"
              >
                <div className="hidden md:block text-right mr-1">
                  <p className="text-[11px] font-bold text-white truncate max-w-[80px]">{userEmail.split('@')[0]}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-usa-gold flex items-center justify-center text-usa-maroon font-black">
                  <User size={18} />
                </div>
                <ChevronDown size={14} className={`text-white transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {{/* User Menu Dropdown Content remains mostly same but styles refined */}}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-dark-800 rounded-xl shadow-2xl border border-zinc-100 dark:border-dark-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 bg-usa-maroon/5 border-b border-zinc-100 dark:border-dark-700">
                    <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Authenticated Account</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{userEmail}</p>
                  </div>
                  <div className="p-1.5">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-usa-maroon border-t border-white/10 py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-4 text-base font-black px-6 py-4 rounded-xl ${
                location.pathname === link.path 
                  ? 'bg-usa-gold text-usa-maroon shadow-lg' 
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex justify-between px-6">
             <button onClick={toggleDarkMode} className="text-white/70 flex items-center gap-2 font-bold">
               {isDark ? <Sun size={20} /> : <Moon size={20} />} Theme
             </button>
             <button onClick={handleLogout} className="text-red-300 font-bold">Logout</button>
          </div>
        </div>
      )}
    </header>
  );
}
