import { useState, useRef } from 'react';
import { Upload, MapPin, Tag, Calendar, Camera, Send, User, Loader2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ReportItem({ type = 'lost' }) {
  const isLost = type === 'lost';
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    item_name: '',
    location: '',
    reporter_name: '',
    description: '',
    category: '',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    
    try {
      let imageUrl = null;

      // 1. Upload Image to Supabase Storage if exists
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${isLost ? 'lost' : 'found'}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('item-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('item-images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }

      // 2. Insert Record into Database
      const dateStr = new Date().toISOString().split('T')[0];
      const tableName = isLost ? 'LostItems' : 'FoundItems';
      const dataToInsert = isLost ? {
        item_name: formData.item_name,
        date_lost: dateStr,
        place_lost: formData.location,
        reported_by: formData.reporter_name,
        description: formData.description,
        image_url: imageUrl,
        category: formData.category
      } : {
        item_name: formData.item_name,
        date_found: dateStr,
        location_found: formData.location,
        turned_in_by: formData.reporter_name,
        description: formData.description,
        image_url: imageUrl,
        category: formData.category
      };

      const { error: insertError } = await supabase
        .from(tableName)
        .insert([dataToInsert]);

      if (insertError) throw insertError;

      alert(`${isLost ? 'Lost' : 'Found'} item reported successfully!`);
      navigate('/browse');
    } catch (err) {
      console.error("Error reporting item:", err);
      setStatus(err.message || 'Failed to submit. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-usa-maroon/10 text-usa-maroon dark:bg-usa-gold/10 dark:text-usa-gold text-xs font-bold uppercase tracking-widest mb-4">
          Item Registration
        </div>
        <h2 className="text-4xl md:text-5xl font-black dark:text-white">
          Report <span className={isLost ? 'text-usa-maroon dark:text-red-500' : 'text-usa-gold'}>{isLost ? 'Lost' : 'Found'}</span> Item
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg">
          Please provide accurate details about the item. High-quality descriptions and photos significantly increase the chances of a successful return.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Image Upload */}
        <div className="lg:col-span-5">
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 uppercase tracking-wider">
            Item Photo
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`modern-card p-4 h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-dark-600 hover:border-usa-maroon dark:hover:border-usa-gold transition-all group cursor-pointer relative overflow-hidden bg-zinc-50/50 dark:bg-dark-800/50 ${imagePreview ? 'border-none' : ''}`}
          >
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                <button 
                  onClick={removeImage}
                  className="absolute top-4 right-4 p-2 bg-usa-maroon text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-zinc-100 dark:bg-dark-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera size={32} className="text-zinc-400 group-hover:text-usa-maroon dark:group-hover:text-usa-gold transition-colors" />
                </div>
                <div>
                  <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Click to upload photo
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Drag and drop or browse files
                  </p>
                </div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest pt-4 font-bold">JPG, PNG up to 5MB</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="mt-4 p-4 rounded-lg bg-zinc-100 dark:bg-dark-700 border border-zinc-200 dark:border-dark-600">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              <span className="font-bold text-usa-maroon dark:text-usa-gold">Pro Tip:</span> Take photos of identifiers like stickers, scratches, or unique serial numbers.
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="modern-card p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Tag size={12} className="text-usa-maroon dark:text-usa-gold" /> Item Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Apple AirPods Pro"
                    value={formData.item_name}
                    className="form-input font-medium"
                    onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={12} className="text-usa-maroon dark:text-usa-gold" /> {isLost ? 'Last Seen At' : 'Found At'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Administration Building Lobby"
                    value={formData.location}
                    className="form-input font-medium"
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={12} className="text-usa-maroon dark:text-usa-gold" /> {isLost ? 'Your Name' : 'Finder Name'}
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.reporter_name}
                    className="form-input font-medium"
                    onChange={(e) => setFormData({ ...formData, reporter_name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Category</label>
                  <select
                    className="form-input font-medium appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="documents">Official Documents</option>
                    <option value="personal">Personal Items</option>
                    <option value="clothing">Clothing & Apparel</option>
                    <option value="accessory">Accessories</option>
                    <option value="other">Other Items</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Detailed Description</label>
                <textarea
                  placeholder="Include brand, color, stickers, unique marks, or contents (for bags/wallets)..."
                  rows="4"
                  value={formData.description}
                  className="form-input font-medium resize-none"
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                ></textarea>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all ${
                  isLost ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={24} className="animate-spin" /> Submitting Report...
                  </>
                ) : (
                  <>
                    <Send size={20} /> Submit {isLost ? 'Lost' : 'Found'} Report
                  </>
                )}
              </button>
              {status && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-lg">
                  <p className="text-center text-sm text-red-600 dark:text-red-400 font-bold">{status}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
