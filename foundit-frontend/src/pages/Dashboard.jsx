import { useEffect, useState } from 'react';
import { Search, PlusCircle, CheckCircle, Package, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [counts, setCounts] = useState({ lost: 0, found: 0, reunited: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          supabase.from('LostItems').select('*', { count: 'exact', head: true }),
          supabase.from('FoundItems').select('*', { count: 'exact', head: true })
        ]);
        
        setCounts({
          lost: lostRes.count || 0,
          found: foundRes.count || 0,
          reunited: Math.floor((foundRes.count || 0) * 0.4) // Mocked reunited stat for now
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-dark-700 bg-white dark:bg-dark-800 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10 md:p-16 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-usa-maroon/10 text-usa-maroon dark:bg-usa-gold/10 dark:text-usa-gold text-xs font-bold uppercase tracking-widest">
              Official University Portal
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.1] text-zinc-900 dark:text-white">
              Reuniting the <br /> 
              <span className="text-usa-maroon dark:text-usa-gold">Augustinian Community.</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
              FoundiT is the centralized hub for the University of San Agustin's Lost & Found system. 
              Report items, browse listings, and help fellow students recover their belongings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/report-lost" className="btn-primary flex items-center justify-center gap-2 px-8">
                <Search size={18} /> I Lost Something
              </Link>
              <Link to="/report-found" className="btn-outline flex items-center justify-center gap-2 px-8">
                <PlusCircle size={18} /> I Found Something
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative h-full min-h-[500px]">
            <div className="absolute inset-0 bg-usa-maroon/5 dark:bg-usa-gold/5" />
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
              alt="University Campus" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 dark:mix-blend-normal dark:opacity-40"
            />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black dark:text-white">Live Tracking</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Current status of items within our university network</p>
          </div>
          <Link to="/browse" className="text-sm font-bold text-usa-maroon dark:text-usa-gold flex items-center gap-1 hover:underline">
            View active listings <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Lost Items" value={loading ? "..." : counts.lost} icon={Package} colorClass="#800000" />
          <StatCard title="Items Found" value={loading ? "..." : counts.found} icon={CheckCircle} colorClass="#FFD700" />
          <StatCard title="Reunited Successfully" value={loading ? "..." : counts.reunited} icon={CheckCircle} colorClass="#059669" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-usa-maroon dark:bg-usa-maroon-light rounded-2xl p-10 md:p-16 text-white text-center md:text-left overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-usa-gold/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl space-y-4">
            <h3 className="text-3xl font-black">Help Someone Today.</h3>
            <p className="text-white/80 text-lg">
              Returning a lost item is a small act of kindness that makes a huge difference. 
              Be the hero in someone's story.
            </p>
          </div>
          <Link to="/report-found" className="btn-secondary px-10 py-4 shadow-2xl whitespace-nowrap">
            Report a Discovery
          </Link>
        </div>
      </section>
    </div>
  );
}
