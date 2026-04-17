import { useState } from 'react';
import { reportLostItem, reportFoundItem } from '../services/api';
import { Target } from 'lucide-react';

export default function ReportItem({ type = 'lost' }) {
  const isLost = type === 'lost';
  const title = isLost ? 'Report Lost Item' : 'Report Found Item';
  
  const [formData, setFormData] = useState({
    item_name: '',
    place_lost: '', // Reused for location_found in API payload via state mapping if needed
    location_found: '',
    reported_by: '', // Reused for turned_in_by
    turned_in_by: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateStr = new Date().toISOString().split('T')[0];
    
    try {
      if (isLost) {
        await reportLostItem({
          item_name: formData.item_name,
          date_lost: dateStr,
          place_lost: formData.place_lost || formData.location_found,
          reported_by: formData.reported_by || formData.turned_in_by
        });
      } else {
        await reportFoundItem({
          item_name: formData.item_name,
          date_found: dateStr,
          location_found: formData.location_found || formData.place_lost,
          turned_in_by: formData.turned_in_by || formData.reported_by
        });
      }
      setStatus('Success! Item report submitted.');
      setFormData({ item_name: '', place_lost: '', location_found: '', reported_by: '', turned_in_by: '' });
    } catch (err) {
      console.error(err);
      setStatus('Failed to submit. Check backend connection.');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
          <Target className={isLost ? "text-accent" : "text-emerald-500"} />
          {title}
        </h2>
        <p className="text-zinc-400 mt-2">Fill in the details below.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-lg space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Item Name</label>
          <input
            required
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-accent transition-colors"
            placeholder="e.g. Blue Umbrella"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            {isLost ? "Place Lost" : "Location Found"}
          </label>
          <input
            required
            type="text"
            name={isLost ? "place_lost" : "location_found"}
            value={isLost ? formData.place_lost : formData.location_found}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-accent transition-colors"
            placeholder="e.g. Cafeteria"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">
            {isLost ? "Reported By (Name)" : "Turned In By (Name)"}
          </label>
          <input
            required
            type="text"
            name={isLost ? "reported_by" : "turned_in_by"}
            value={isLost ? formData.reported_by : formData.turned_in_by}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-accent transition-colors"
            placeholder="Your Name"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-lg transition-colors"
        >
          Submit Report
        </button>

        {status && (
          <p className={`text-center text-sm font-medium ${status.includes('Success') ? 'text-emerald-500' : 'text-red-500'}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
