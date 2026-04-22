import { useEffect, useState } from 'react';
import { Search, PlusCircle, CheckCircle, Package, ArrowRight, FileText, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [counts, setCounts] = useState({ lost: 0, reunited: 0, total: 3 });
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Stats
        const [lostRes, foundRes, totalRes] = await Promise.all([
          supabase.from('LostItems').select('*', { count: 'exact', head: true }),
          supabase.from('Claims').select('*', { count: 'exact', head: true }).eq('status', 'returned'),
          supabase.from('FoundItems').select('*', { count: 'exact', head: true })
        ]);
        
        setCounts({
          lost: lostRes.count || 3,
          reunited: foundRes.count || 0,
          total: (lostRes.count || 0) + (totalRes.count || 0) || 3
        });

        // 2. Fetch Recently Found Items
        const { data: items, error: itemsError } = await supabase
          .from('FoundItems')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (itemsError) throw itemsError;
        setRecentItems(items || []);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section - Maroon Banner style */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-usa-maroon to-usa-maroon-light shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/university_bg.png" 
            alt="University" 
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>
        
        <div className="relative z-10 p-12 md:p-20 text-center md:text-left max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Reuniting Augustinians <br />
            with their belongings
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
            Report found items and claim lost belongings within the University of San Agustin campus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/report-found" 
              className="px-8 py-4 bg-usa-gold hover:bg-usa-gold/90 text-usa-maroon font-black rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <PlusCircle size={20} /> Report Found Item
            </Link>
            <Link 
              to="/browse" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-black rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Search size={20} /> Browse Lost Items
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section - 3 clean white cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl border border-zinc-100 dark:border-dark-700 shadow-sm flex items-center gap-6 group hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-600">
            <Package size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Currently Lost</p>
            <p className="text-3xl font-black text-zinc-900 dark:text-white">
              {loading ? '...' : counts.lost} <span className="text-lg font-bold text-zinc-500 lowercase">items</span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl border border-zinc-100 dark:border-dark-700 shadow-sm flex items-center gap-6 group hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-usa-gold/10 flex items-center justify-center text-usa-gold">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Items Reunited</p>
            <p className="text-3xl font-black text-zinc-900 dark:text-white">
              {loading ? '...' : counts.reunited} <span className="text-lg font-bold text-zinc-500 lowercase">items</span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl border border-zinc-100 dark:border-dark-700 shadow-sm flex items-center gap-6 group hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-dark-700 flex items-center justify-center text-zinc-600">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Total Reports</p>
            <p className="text-3xl font-black text-zinc-900 dark:text-white">
              {loading ? '...' : counts.total} <span className="text-lg font-bold text-zinc-500 lowercase">items</span>
            </p>
          </div>
        </div>
      </section>

      {/* Recently Found Items Gallery */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Recently Found Items</h3>
          <Link to="/browse" className="text-usa-maroon dark:text-usa-gold font-bold text-sm flex items-center gap-1 hover:underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             [1, 2, 3].map(i => <div key={i} className="h-64 rounded-2xl bg-zinc-100 dark:bg-dark-800 animate-pulse" />)
          ) : recentItems.length > 0 ? (
            recentItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-dark-800 rounded-2xl border border-zinc-100 dark:border-dark-700 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden bg-zinc-100">
                   <img 
                     src={item.image_url || '/assets/university_bg.png'} 
                     alt={item.item_name}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute top-4 right-4">
                      <span className="bg-usa-maroon text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                        {item.category || 'General'}
                      </span>
                   </div>
                </div>
                <div className="p-6 space-y-3">
                   <h4 className="text-xl font-black text-zinc-900 dark:text-white truncate">{item.item_name}</h4>
                   <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium line-clamp-2 min-h-[40px]">
                     {item.description || "Found near the campus premises."}
                   </p>
                   <div className="pt-4 border-t border-zinc-50 dark:border-dark-700 flex items-center justify-between text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                     <span className="flex items-center gap-1.5"><Calendar size={12} /> {item.date_found}</span>
                     <span className="flex items-center gap-1.5"><MapPin size={12} /> {item.location_found}</span>
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-zinc-400">
               <p className="text-lg font-bold">No items recorded yet.</p>
               <Link to="/report-found" className="text-usa-maroon mt-2 inline-block">Be the first to report!</Link>
            </div>
          )}
        </div>
      </section>
      
      <footer className="text-center py-10 border-t border-zinc-100 dark:border-dark-800 text-zinc-400 text-[11px] font-bold uppercase tracking-widest">
        <p>© 2026 University of San Agustin Lost and Found System</p>
        <p className="text-usa-maroon/40 mt-1">Not for official use — Demo only</p>
      </footer>
    </div>
  );
}
