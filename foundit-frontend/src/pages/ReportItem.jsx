import { useState } from 'react';
import { reportLostItem, reportFoundItem } from '../services/api';
import { Upload, MapPin, Tag, Calendar, Camera, Send, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReportItem({ type = 'lost' }) {
  const isLost = type === 'lost';
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_name: '',
    location: '',
    reporter_name: '',
    description: '',
    category: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateStr = new Date().toISOString().split('T')[0];
    try {
      if (isLost) {
        await reportLostItem({
          item_name: formData.item_name,
          date_lost: dateStr,
          place_lost: formData.location,
          reported_by: formData.reporter_name,
          description: formData.description
        });
      } else {
        await reportFoundItem({
          item_name: formData.item_name,
          date_found: dateStr,
          location_found: formData.location,
          turned_in_by: formData.reporter_name,
          description: formData.description
        });
      }
      alert(`${isLost ? 'Lost' : 'Found'} item reported successfully!`);
      navigate('/browse');
    } catch (err) {
      console.error("Error reporting item:", err);
      setStatus('Failed to submit. Please check your connection.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black dark:text-white">
          Report <span className={isLost ? 'text-usa-maroon dark:text-red-500' : 'text-usa-gold'}>{isLost ? 'Lost' : 'Found'}</span> Item
        </h2>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Provide detailed information about the item to help us identify and return it. 
          Be as specific as possible regarding the location.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Upload Mockup */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 h-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-dark-700 hover:border-usa-maroon dark:hover:border-usa-gold transition-colors group cursor-pointer">
            <Camera size={48} className="text-zinc-400 group-hover:text-usa-maroon dark:group-hover:text-usa-gold transition-colors" />
            <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">
              Drag and drop an image here, or <span className="text-usa-maroon dark:text-usa-gold font-bold">browse files</span>
            </p>
            <p className="mt-2 text-[10px] text-zinc-400 uppercase tracking-widest">JPG, PNG up to 10MB</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold dark:text-white flex items-center gap-2">
                  <Tag size={14} className="text-usa-maroon dark:text-usa-gold" /> Item Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Blue HydroFlask"
                  value={formData.item_name}
                  className="w-full bg-zinc-100 dark:bg-dark-700 border-none rounded-xl p-3 focus:ring-2 focus:ring-usa-maroon dark:focus:ring-usa-gold transition-all"
                  onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold dark:text-white flex items-center gap-2">
                  <MapPin size={14} className="text-usa-maroon dark:text-usa-gold" /> Location {isLost ? 'Last Seen' : 'Found'}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mendel Hall Room 302"
                  value={formData.location}
                  className="w-full bg-zinc-100 dark:bg-dark-700 border-none rounded-xl p-3 focus:ring-2 focus:ring-usa-maroon dark:focus:ring-usa-gold transition-all"
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold dark:text-white flex items-center gap-2">
                  <User size={14} className="text-usa-maroon dark:text-usa-gold" /> Reporter Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.reporter_name}
                  className="w-full bg-zinc-100 dark:bg-dark-700 border-none rounded-xl p-3 focus:ring-2 focus:ring-usa-maroon dark:focus:ring-usa-gold transition-all"
                  onChange={(e) => setFormData({ ...formData, reporter_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold dark:text-white">Category</label>
                <select
                  className="w-full bg-zinc-100 dark:bg-dark-700 border-none rounded-xl p-3 focus:ring-2 focus:ring-usa-maroon dark:focus:ring-usa-gold transition-all"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="documents">Documents</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessory">Accessory</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold dark:text-white">Detailed Description</label>
              <textarea
                placeholder="Describe any unique markings, stickers, or features..."
                rows="4"
                value={formData.description}
                className="w-full bg-zinc-100 dark:bg-dark-700 border-none rounded-xl p-4 focus:ring-2 focus:ring-usa-maroon dark:focus:ring-usa-gold transition-all"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] ${
                  isLost ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                <Send size={20} /> Submit {isLost ? 'Lost' : 'Found'} Report
              </button>
            </div>
            
            {status && (
              <p className="text-center text-sm text-red-500 font-medium">{status}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
