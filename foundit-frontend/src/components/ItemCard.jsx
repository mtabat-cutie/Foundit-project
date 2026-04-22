import React from 'react';
import { Calendar, MapPin, Tag, User, Camera } from 'lucide-react';

export default function ItemCard({ item, type }) {
  const isLost = type === 'lost';

  return (
    <div className="modern-card overflow-hidden group cursor-pointer flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 bg-zinc-100 dark:bg-dark-700 overflow-hidden">
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.item_name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-300 dark:text-zinc-600">
            <Camera size={48} strokeWidth={1.5} />
            <p className="mt-2 text-xs font-bold uppercase tracking-widest">No Photo Available</p>
          </div>
        )}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm ${
          isLost ? 'bg-red-600 text-white' : 'bg-usa-gold text-usa-maroon'
        }`}>
          {isLost ? 'Lost' : 'Found'}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div>
          <h4 className="text-xl font-bold dark:text-white line-clamp-1 group-hover:text-usa-maroon dark:group-hover:text-usa-gold transition-colors">
            {item.item_name || 'Unnamed Item'}
          </h4>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 italic">
            "{item.description || 'No description provided.'}"
          </p>
        </div>
        
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center gap-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <MapPin size={16} className="text-usa-maroon dark:text-usa-gold min-w-[16px]" />
            <span className="line-clamp-1">{item.place_lost || item.location_found || 'Unknown location'}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Calendar size={16} className="text-usa-maroon dark:text-usa-gold min-w-[16px]" />
            <span>{new Date(item.date_lost || item.date_found).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <User size={16} className="text-usa-maroon dark:text-usa-gold min-w-[16px]" />
            <span className="line-clamp-1">By: {item.reported_by || item.turned_in_by || 'Anonymous'}</span>
          </div>
        </div>

        <div className="pt-4 mt-auto">
          <button className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm ${
            isLost ? 'btn-primary' : 'btn-secondary'
          }`}>
            {isLost ? 'Help Identify' : 'Claim Item'}
          </button>
        </div>
      </div>
    </div>
  );
}
