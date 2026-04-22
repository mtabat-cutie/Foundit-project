import React, { useState } from 'react';
import { Calendar, MapPin, Tag, User, Camera, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ItemCard({ item, type }) {
  const isLost = type === 'lost';
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);

  const handleClaim = async (e) => {
    e.stopPropagation();
    if (hasClaimed) return;

    setIsClaiming(true);
    try {
      const userEmail = localStorage.getItem('userEmail') || 'anonymous@usa.edu.ph';
      
      const { error } = await supabase
        .from('Claims')
        .insert([{
          item_id: item.id,
          item_type: type,
          claimant_name: userEmail.split('@')[0],
          claimant_id: userEmail,
          status: 'pending'
        }]);

      if (error) throw error;
      
      setHasClaimed(true);
      alert('Claim submitted successfully! The security office will review your request.');
    } catch (err) {
      console.error('Error submitting claim:', err);
      alert('Failed to submit claim. Please try again.');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="modern-card overflow-hidden group cursor-default flex flex-col h-full bg-white dark:bg-dark-800 border border-zinc-100 dark:border-dark-700 hover:shadow-2xl transition-all duration-500">
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
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em]">No Photo Provided</p>
          </div>
        )}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm z-10 ${
          isLost ? 'bg-usa-maroon text-white' : 'bg-usa-gold text-usa-maroon'
        }`}>
          {isLost ? 'Lost Item' : 'Found Item'}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-5">
        <div>
          <h4 className="text-xl font-black text-zinc-900 dark:text-white line-clamp-1 group-hover:text-usa-maroon dark:group-hover:text-usa-gold transition-colors">
            {item.item_name || 'Unnamed Item'}
          </h4>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 italic leading-relaxed">
            "{item.description || 'No detailed description provided.'}"
          </p>
        </div>
        
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 text-sm font-bold text-zinc-600 dark:text-zinc-400">
            <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-dark-700 text-usa-maroon dark:text-usa-gold">
              <MapPin size={14} />
            </div>
            <span className="line-clamp-1">{item.place_lost || item.location_found || 'Unknown location'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-zinc-600 dark:text-zinc-400">
            <div className="p-1.5 rounded-lg bg-zinc-50 dark:bg-dark-700 text-usa-maroon dark:text-usa-gold">
              <Calendar size={14} />
            </div>
            <span>{new Date(item.date_lost || item.date_found || item.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
          </div>
        </div>

        <div className="pt-4 mt-auto">
          <button 
            onClick={handleClaim}
            disabled={isClaiming || hasClaimed}
            className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 group/btn ${
              hasClaimed 
                ? 'bg-emerald-500 text-white cursor-default' 
                : isLost 
                  ? 'btn-primary' 
                  : 'btn-secondary'
            }`}
          >
            {isClaiming ? (
              <Loader2 size={16} className="animate-spin" />
            ) : hasClaimed ? (
              <>
                <CheckCircle2 size={16} /> Claim Submitted
              </>
            ) : (
              <>
                {isLost ? 'Identify Ownership' : 'Claim Item'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
