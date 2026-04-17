import { useEffect, useState } from 'react';
import { getLostItems, getFoundItems } from '../services/api';

export default function BrowseItems() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([getLostItems(), getFoundItems()]);
        setLostItems(lostRes.data);
        setFoundItems(foundRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-zinc-400">Loading data...</div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-zinc-100">Viewing Module</h2>
        <p className="text-zinc-400 mt-2">Browse all reported and found items across the school.</p>
      </div>

      {/* Lost Items Table */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-zinc-950 p-4 border-b border-zinc-800">
          <h3 className="text-xl font-bold text-accent">Lost Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-900/50 border-b border-zinc-800">
              <tr>
                <th className="p-4 text-zinc-400 font-medium">Item Name</th>
                <th className="p-4 text-zinc-400 font-medium">Date Lost</th>
                <th className="p-4 text-zinc-400 font-medium">Place Lost</th>
                <th className="p-4 text-zinc-400 font-medium">Reported By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {lostItems.map(item => (
                <tr key={item.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4 text-zinc-200">{item.item_name}</td>
                  <td className="p-4 text-zinc-400">{new Date(item.date_lost).toLocaleDateString()}</td>
                  <td className="p-4 text-zinc-400">{item.place_lost}</td>
                  <td className="p-4 text-zinc-400">{item.reported_by}</td>
                </tr>
              ))}
              {lostItems.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-zinc-500 text-center">No lost items reported.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Found Items Table */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-zinc-950 p-4 border-b border-zinc-800">
          <h3 className="text-xl font-bold text-emerald-500">Found Items</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-900/50 border-b border-zinc-800">
              <tr>
                <th className="p-4 text-zinc-400 font-medium">Item Name</th>
                <th className="p-4 text-zinc-400 font-medium">Date Found</th>
                <th className="p-4 text-zinc-400 font-medium">Location Found</th>
                <th className="p-4 text-zinc-400 font-medium">Turned In By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {foundItems.map(item => (
                <tr key={item.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4 text-zinc-200">{item.item_name}</td>
                  <td className="p-4 text-zinc-400">{new Date(item.date_found).toLocaleDateString()}</td>
                  <td className="p-4 text-zinc-400">{item.location_found}</td>
                  <td className="p-4 text-zinc-400">{item.turned_in_by}</td>
                </tr>
              ))}
              {foundItems.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-zinc-500 text-center">No found items reported.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
