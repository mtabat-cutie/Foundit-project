import React from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';

export default function ItemCard({ item, type }) {
  const isLost = type === 'lost';

  return (
    <div className="glass-card overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
      {/* Image Mockup/Placeholder */}
      <div className="relative h-48 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-400">
            <Tag size={48} strokeWidth={1} />
          </div>
        )}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
          isLost ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
        }`}>
          {isLost ? 'Lost' : 'Found'}
        </div>
      </div>

      <div className="p-5">
        <h4 className="text-xl font-bold dark:text-white line-clamp-1 group-hover:text-usa-maroon dark:group-hover:text-usa-gold transition-colors">
          {item.name || 'Unnamed Item'}
        </h4>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <MapPin size={14} className="text-usa-maroon dark:text-usa-gold" />
            <span className="line-clamp-1">{item.location || 'Unknown location'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Calendar size={14} className="text-usa-maroon dark:text-usa-gold" />
            <span>{new Date(item.date).toLocaleDateString()}</span>
          </div>
        </div>

        <button className={`mt-6 w-full py-2 rounded-lg font-bold text-sm transition-all ${
          isLost ? 'btn-primary' : 'btn-secondary'
        }`}>
          {isLost ? 'Help Find' : 'Claim Item'}
        </button>
      </div>
    </div>
  );
}
