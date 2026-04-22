import { useEffect, useState } from 'react';
import { getLostItems, getFoundItems } from '../services/api';
import { Search, Filter, RefreshCcw, PackageSearch } from 'lucide-react';
import ItemCard from '../components/ItemCard';

export default function BrowseItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('lost');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [lostRes, foundRes] = await Promise.all([getLostItems(), getFoundItems()]);
      
      // Normalize data for consistent rendering
      const normalizedLost = lostRes.data.map(item => ({
        ...item,
        name: item.item_name,
        location: item.place_lost,
        date: item.date_lost,
        type: 'lost'
      }));
      
      const normalizedFound = foundRes.data.map(item => ({
        ...item,
        name: item.item_name,
        location: item.location_found,
        date: item.date_found,
        type: 'found'
      }));
      
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

  const filteredItems = items.filter(item => 
    item.type === activeTab && 
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black dark:text-white">Community <span className="text-usa-maroon dark:text-usa-gold">Gallery</span></h2>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">Search and browse through all reported items in the university.</p>
        </div>
        
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 text-sm font-bold text-usa-maroon dark:text-usa-gold hover:opacity-80 transition-opacity"
        >
          <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} /> Refresh List
        </button>
      </div>

      {/* Controls */}
      <div className="glass-card p-4 flex flex-col md:flex-row shadow-lg gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input 
            type="text" 
            placeholder="Search items by name or location..." 
            className="w-full pl-12 pr-4 py-3 bg-zinc-100 dark:bg-dark-700 border-none rounded-xl focus:ring-2 focus:ring-usa-maroon dark:focus:ring-usa-gold transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex bg-zinc-100 dark:bg-dark-700 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('lost')}
            className={`px-8 py-2 rounded-lg font-bold text-sm transition-all ${
              activeTab === 'lost' 
                ? 'bg-usa-maroon text-white shadow-md' 
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Lost
          </button>
          <button 
            onClick={() => setActiveTab('found')}
            className={`px-8 py-2 rounded-lg font-bold text-sm transition-all ${
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
            <div key={i} className="glass-card h-80 animate-pulse bg-zinc-200/50 dark:bg-dark-800/50 rounded-2xl" />
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="animate-fade-in">
              <ItemCard item={item} type={item.type} />
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card py-20 flex flex-col items-center justify-center text-center">
          <div className="bg-zinc-100 dark:bg-dark-700 p-6 rounded-full mb-6">
            <PackageSearch size={64} className="text-zinc-400" />
          </div>
          <h3 className="text-2xl font-bold dark:text-white">No items found</h3>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-sm">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
