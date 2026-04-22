import { useEffect, useState } from 'react';
import { getLostItems, getFoundItems } from '../services/api'; // Corrected path
import { Search, PlusCircle, CheckCircle, Package } from 'lucide-react';
import StatCard from '../components/StatCard';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [counts, setCounts] = useState({ lost: 0, found: 0, reunited: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([getLostItems(), getFoundItems()]);
        setCounts({
          lost: lostRes.data.length,
          found: foundRes.data.length,
          reunited: Math.floor(foundRes.data.length * 0.7) // Mocked statistic
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="/assets/university_bg.png" 
          alt="University Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-usa-maroon/90 via-usa-maroon/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-12 text-white max-w-2xl">
          <h2 className="text-5xl font-black leading-tight animate-slide-up">
            Never Lose Hope.<br />
            <span className="text-usa-gold">Lost something?</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-100/90 leading-relaxed animate-fade-in">
            Welcome to the official University of San Agustin Lost & Found System. 
            Helping Augustinians reunite with their belongings through a centralized community hub.
          </p>
          <div className="mt-8 flex gap-4 animate-fade-in">
            <Link to="/report-lost" className="btn-secondary flex items-center gap-2">
              <Search size={20} /> I Lost Something
            </Link>
            <Link to="/report-found" className="btn-primary border border-white/20 flex items-center gap-2">
              <PlusCircle size={20} /> I Found Something
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold dark:text-white">System Statistics</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Real-time overview of current items</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Lost Items" value={counts.lost} icon={Package} colorClass="#800000" />
          <StatCard title="Items Found" value={counts.found} icon={CheckCircle} colorClass="#FFD700" />
          <StatCard title="Reunited History" value={counts.reunited} icon={CheckCircle} colorClass="#C0C0C0" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-usa-gold/10 dark:bg-usa-gold/5 border border-usa-gold/20 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center md:text-left">
          <h3 className="text-2xl font-bold text-usa-maroon dark:text-usa-gold">Be a Hero Today</h3>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            Reporting a found item is the first step in returning it to its rightful owner.
            Join our network of helpful Augustinians.
          </p>
        </div>
        <Link to="/report-found" className="btn-primary whitespace-nowrap">
          Report Found Item
        </Link>
      </section>
    </div>
  );
}
