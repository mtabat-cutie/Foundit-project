import { useEffect, useState } from 'react';
import { Search, Filter, RefreshCcw, PackageSearch, Loader2 } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import { supabase } from '../lib/supabase';

export default function BrowseItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('lost');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [lostRes, foundRes] = await Promise.all([
        supabase.from('LostItems').select('*').order('date_lost', { ascending: false }),
        supabase.from('FoundItems').select('*').order('date_found', { ascending: false })
      ]);
      
      const normalizedLost = (lostRes.data || []).map(item => ({ ...item, type: 'lost' }));
      const normalizedFound = (foundRes.data || []).map(item => ({ ...item, type: 'found' }));
      
      setItems([...normalizedLost, ...normalizedFound]);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesTab = item.type === activeTab;
    const itemName = (item.item_name || '').toLowerCase();
    const itemLocation = (item.place_lost || item.location_found || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return matchesTab && (itemName.includes(query) || itemLocation.includes(query));
  });

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-usa-maroon/10 text-usa-maroon dark:bg-usa-gold/10 dark:text-usa-gold text-xs font-bold uppercase tracking-widest mb-4">
            Browse Listings
          </div>
          <h2 className="text-4xl md:text-5xl font-black dark:text-white">
            Community <span className="text-usa-maroon dark:text-usa-gold">Gallery</span>
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-lg">
            A real-time directory of all reported items across the university campus.
          </p>
        </div>
        
        <button 
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-bold text-usa-maroon dark:text-usa-gold hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} /> 
          {loading ? 'Refreshing...' : 'Refresh List'}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="modern-card p-4 flex flex-col lg:flex-row gap-4 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by item name or location..." 
            className="form-input pl-12 py-3.5 text-base font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex bg-zinc-100 dark:bg-dark-700 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('lost')}
            className={`flex-1 lg:flex-none lg:min-w-[140px] px-8 py-2.5 rounded-lg font-bold text-sm transition-all ${
              activeTab === 'lost' 
                ? 'bg-usa-maroon text-white shadow-md' 
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Lost
          </button>
          <button 
            onClick={() => setActiveTab('found')}
            className={`flex-1 lg:flex-none lg:min-w-[140px] px-8 py-2.5 rounded-lg font-bold text-sm transition-all ${
              activeTab === 'found' 
                ? 'bg-usa-gold text-usa-maroon shadow-md' 
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Found
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="modern-card h-[400px] animate-pulse bg-zinc-100 dark:bg-dark-800" />
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="animate-slide-up">
              <ItemCard item={item} type={item.type} />
            </div>
          ))}
        </div>
      ) : (
        <div className="modern-card py-24 flex flex-col items-center justify-center text-center px-6">
          <div className="w-24 h-24 rounded-full bg-zinc-50 dark:bg-dark-700 flex items-center justify-center mb-6">
            <PackageSearch size={48} className="text-zinc-300" />
          </div>
          <h3 className="text-2xl font-black dark:text-white">No items found</h3>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-sm text-lg">
            We couldn't find any {activeTab} items matching "{searchQuery}".
          </p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-8 text-usa-maroon dark:text-usa-gold font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
