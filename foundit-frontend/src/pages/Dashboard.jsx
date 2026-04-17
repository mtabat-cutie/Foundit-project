import { useEffect, useState } from 'react';
import { getLostItems, getFoundItems } from '../../services/api';
import { Archive, ArchiveRestore } from 'lucide-react';

export default function Dashboard() {
  const [counts, setCounts] = useState({ lost: 0, found: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([getLostItems(), getFoundItems()]);
        setCounts({
          lost: lostRes.data.length,
          found: foundRes.data.length
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-zinc-100">Dashboard Overview</h2>
        <p className="text-zinc-400 mt-2">Welcome to the FoundiT system hub.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-accent/5 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 font-medium">Lost Items Reported</p>
              <h3 className="text-5xl font-bold text-accent mt-4">{counts.lost}</h3>
            </div>
            <div className="bg-accent/10 p-4 rounded-xl">
              <Archive className="text-accent" size={32} />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-emerald-500/5 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 font-medium">Found Items Recovered</p>
              <h3 className="text-5xl font-bold text-emerald-500 mt-4">{counts.found}</h3>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-xl">
              <ArchiveRestore className="text-emerald-500" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
