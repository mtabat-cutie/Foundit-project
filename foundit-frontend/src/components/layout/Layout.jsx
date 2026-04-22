import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header />
      <main className="pb-12 animate-fade-in px-4">
        <div className="max-w-7xl mx-auto mt-8">
          <Outlet />
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="py-8 bg-zinc-100 dark:bg-dark-800 border-t border-zinc-200 dark:border-dark-700 text-center text-zinc-500 dark:text-zinc-400 text-sm">
        <p>© 2026 University of San Agustin - FoundiT System</p>
      </footer>
    </div>
  );
}
