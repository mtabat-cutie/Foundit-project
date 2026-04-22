import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, Landmark, User, LogOut, ChevronDown, Bell, Briefcase } from 'lucide-react';
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
    // Theme initialization
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    // Close user menu on click outside
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
    // Ensure all tabs sync the state
    window.dispatchEvent(new Event('storage'));
  };

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Report Item', path: '/report-found' },
    { name: 'Browse', path: '/browse' },
    { name: 'My Claims', path: '/claims' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-usa-maroon dark:bg-dark-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20">
              <Landmark size={24} className="text-usa-gold" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none uppercase">FoundiT</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-usa-gold font-bold">University of San Agustin</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold tracking-wide transition-all px-1 py-2 border-b-2 hover:text-usa-gold ${
                  location.pathname === link.path 
                    ? 'text-usa-gold border-usa-gold' 
                    : 'text-white/80 border-transparent hover:border-usa-gold/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-5">
            <div className="hidden md:flex items-center gap-2 p-1 bg-black/10 rounded-xl">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-usa-gold rounded-full border-2 border-usa-maroon" />
              </button>
            </div>
            
            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all active:scale-[0.98]"
              >
                <div className="hidden md:block text-right mr-1">
                  <p className="text-[10px] font-black uppercase text-usa-gold tracking-widest leading-none">Verified</p>
                  <p className="text-[11px] font-bold text-white leading-tight mt-0.5 truncate max-w-[100px]">{userEmail.split('@')[0]}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-usa-gold flex items-center justify-center text-usa-maroon font-black shadow-inner">
                  <User size={20} />
                </div>
                <ChevronDown size={14} className={`text-white transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-zinc-100 dark:border-dark-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-5 bg-usa-maroon/5 dark:bg-usa-gold/5 border-b border-zinc-100 dark:border-dark-700">
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{userEmail}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-dark-700 rounded-xl transition-colors">
                      <User size={18} className="text-usa-maroon dark:text-usa-gold" /> Profile Settings
                    </button>
                    <button 
                      onClick={() => { navigate('/claims'); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-dark-700 rounded-xl transition-colors"
                    >
                      <Briefcase size={18} className="text-usa-maroon dark:text-usa-gold" /> My Claims
                    </button>
                    <div className="h-px bg-zinc-100 dark:bg-dark-700 my-2 mx-2"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-usa-maroon-light dark:bg-dark-900 border-t border-white/10 py-6 px-4 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <nav className="grid grid-cols-1 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-black px-6 py-4 rounded-2xl flex items-center justify-between transition-all ${
                  location.pathname === link.path 
                    ? 'bg-usa-gold text-usa-maroon shadow-lg' 
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10">
             <button
               onClick={toggleDarkMode}
               className="w-full flex items-center justify-between px-6 py-4 text-white/90 font-bold"
             >
               Theme: {isDark ? 'Dark Mode' : 'Light Mode'}
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button 
               onClick={handleLogout}
               className="w-full flex items-center justify-between px-6 py-4 text-red-300 font-bold"
             >
               Logout from Portal
               <LogOut size={20} />
             </button>
          </div>
        </div>
      )}
    </header>
  );
}
