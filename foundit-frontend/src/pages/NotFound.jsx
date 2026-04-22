import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="modern-card p-12 max-w-lg space-y-8">
        <div className="w-24 h-24 bg-usa-maroon/10 dark:bg-usa-gold/10 rounded-full flex items-center justify-center mx-auto">
          <Search size={48} className="text-usa-maroon dark:text-usa-gold" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black dark:text-white">Page Not Found</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>
        <div className="pt-6">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home size={18} /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
