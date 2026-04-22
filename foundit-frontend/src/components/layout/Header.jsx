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
    { name: 'Report Item', path: '/report' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-usa-maroon text-white shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="bg-usa-gold p-2 rounded-xl">
              <Landmark className="text-usa-maroon" size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight leading-none">USA</h1>
              <p className="text-[10px] uppercase tracking-widest text-usa-gold font-semibold">Lost & Found System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-usa-gold ${
                  location.pathname === link.path ? 'text-usa-gold border-b-2 border-usa-gold pb-1' : 'text-white/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} className="text-usa-gold" /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-usa-maroon border-t border-white/10 animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium px-4 py-2 rounded-lg ${
                  location.pathname === link.path ? 'bg-usa-gold text-usa-maroon' : 'text-white hover:bg-white/10'
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
