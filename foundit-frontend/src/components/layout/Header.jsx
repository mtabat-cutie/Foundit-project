import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Landmark } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
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

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Browse Items', path: '/browse' },
    { name: 'Report Lost', path: '/report-lost' },
    { name: 'Report Found', path: '/report-found' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-dark-800 border-b border-zinc-200 dark:border-dark-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="bg-usa-maroon p-2 rounded-lg text-white">
              <Landmark size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight leading-none dark:text-white">FoundiT</h1>
              <p className="text-[10px] uppercase tracking-widest text-usa-maroon dark:text-usa-gold font-bold">University of San Agustin</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === link.path 
                    ? 'text-usa-maroon dark:text-usa-gold border-b-2 border-usa-maroon dark:border-usa-gold pb-1' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-usa-maroon dark:hover:text-usa-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg bg-zinc-100 dark:bg-dark-700 hover:bg-zinc-200 dark:hover:bg-dark-600 transition-colors dark:text-white"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-lg bg-zinc-100 dark:bg-dark-700 hover:bg-zinc-200 dark:hover:bg-dark-600 transition-colors dark:text-white"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-800 border-t border-zinc-200 dark:border-dark-700 py-4 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col px-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-bold px-4 py-3 rounded-lg ${
                  location.pathname === link.path 
                    ? 'bg-usa-maroon text-white' 
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-dark-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
