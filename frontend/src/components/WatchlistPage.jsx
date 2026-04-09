import React, { useState, useEffect } from 'react';
import { Heart, Trash2, IndianRupee, Loader2, Target, CheckCircle2, History } from 'lucide-react';
import { useNotifications } from './NotificationProvider';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const WatchlistPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  const fetchWatchlist = async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/watchlist?user_id=${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to fetch watchlist", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [user]);

  const removeItem = async (id, name) => {
    try {
      await fetch(`/api/watchlist/${id}?user_id=${user.uid}`, { method: 'DELETE' });
      addNotification(`Removed ${name} from watchlist`, 'info');
      fetchWatchlist();
    } catch (err) {
      addNotification("Failed to remove item", "error");
    }
  };

  return (
    <div className="space-y-8 pb-16 text-[#1A1A1A]">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[var(--neo-pink)] text-white shadow-[4px_4px_0_0_var(--neo-shadow)] border-[2px] border-[var(--neo-border)]">
          <Heart size={32} fill="currentColor" />
        </div>
        <div>
          <h2 className="text-4xl font-bebas tracking-tighter uppercase leading-none">Your Watchlist</h2>
          <p className="font-bold text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mt-1">Tracking {items.length} premium deals</p>
        </div>
      </div>

      {/* Fast Track Section - Refined & Responsive */}
      <section className="bg-white border-[3px] border-[var(--neo-border)] p-2 shadow-[6px_6px_0_0_var(--neo-shadow)]">
         <form 
            onSubmit={async (e) => {
               e.preventDefault();
               const name = e.target.pname.value;
               if (!name) return;
               addNotification(`INITIATING TRACKING: ${name}`, 'info');
               await fetch(`/api/watchlist?query=${encodeURIComponent(name)}&user_id=${user.uid}`, { method: 'POST' });
               e.target.reset();
               fetchWatchlist();
            }}
            className="flex flex-col md:flex-row items-stretch gap-1"
         >
            <div className="bg-[var(--neo-yellow)] border-b-[3px] md:border-b-0 md:border-r-[3px] border-[var(--neo-border)] px-6 py-3 md:py-0 flex items-center shrink-0 justify-center md:justify-start">
               <span className="font-bebas text-2xl pt-1">FAST TRACK</span>
            </div>
            <input 
               name="pname"
               placeholder="iPad Air, Sony WH-1000XM5..." 
               className="flex-1 bg-[#FDFCF0] py-4 px-6 font-bold outline-none focus:bg-white transition-all placeholder:text-[#1A1A1A]/20 min-w-0"
            />
            <button className="bg-[var(--neo-green)] border-t-[3px] md:border-t-0 md:border-l-[3px] border-[var(--neo-border)] px-10 py-4 md:py-0 font-bebas text-2xl hover:bg-[var(--neo-yellow)] transition-all">
               ADD TO LIST
            </button>
         </form>
      </section>

      {loading ? (
        <div className="bg-white border-[3px] border-[var(--neo-border)] p-12 text-center shadow-[6px_6px_0_0_var(--neo-shadow)]">
          <Loader2 className="animate-spin mx-auto text-[var(--neo-pink)]" size={48} />
          <p className="font-bebas text-2xl mt-4 uppercase opacity-40">Syncing Tracking Data...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white border-[3px] border-[var(--neo-border)] border-dashed p-20 text-center shadow-[6px_6px_0_0_var(--neo-shadow)]">
          <div className="w-16 h-16 bg-slate-100 border-[2px] border-[var(--neo-border)] rounded-full flex items-center justify-center mx-auto mb-4 opacity-30">
            <Heart size={32} />
          </div>
          <h3 className="font-bebas text-4xl uppercase opacity-20">Watchlist Empty</h3>
          <p className="font-bold text-[9px] uppercase tracking-widest mt-2 opacity-40 italic">Use 'Fast Track' above or scan in Research Lab</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => {
            // Clean up old fallback text
            const cleanName = item.product_name?.replace(/\(FALLBACK\)/gi, '').trim() || 'Tracked Product';
            const isHit = item.target_price && item.best_price <= item.target_price;
            
            const getDirectLink = () => {
              if (item.best_url) return item.best_url;
              // Fallback for older items with missing URLs
              const q = encodeURIComponent(item.product_name || item.query);
              const p = item.best_platform;
              if (p === "Amazon") return `https://www.amazon.in/s?k=${q}`;
              if (p === "Flipkart") return `https://www.flipkart.com/search?q=${q}`;
              if (p === "Reliance Digital") return `https://www.reliancedigital.in/search?q=${q}`;
              if (p === "Croma") return `https://www.croma.com/search?text=${q}`;
              return `https://www.google.com/search?q=${q}+buy+online`;
            };

            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`group bg-white border-[3px] border-[var(--neo-border)] p-8 shadow-[8px_8px_0_0_var(--neo-shadow)] relative flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all`}
              >
                {isHit && (
                  <div className="absolute -top-4 -right-4 bg-[var(--neo-green)] border-[3px] border-[var(--neo-border)] p-3 shadow-[4px_4px_0_0_var(--neo-shadow)] z-10 rotate-12">
                     <CheckCircle2 size={24} />
                  </div>
                )}
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-bebas text-4xl leading-none uppercase tracking-tight max-w-[80%]">{cleanName}</h3>
                    <button 
                      onClick={() => removeItem(item.id, item.product_name)}
                      className="p-3 text-[#1A1A1A]/20 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                     <div className="px-3 py-1 bg-[var(--neo-yellow)] border-[2px] border-[var(--neo-border)] font-bold text-[10px] uppercase">
                       {item.best_platform || 'Marketplace'}
                     </div>
                     <div className="text-4xl font-space font-black">
                       ₹{item.best_price?.toLocaleString('en-IN')}
                     </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-[2px] border-[var(--neo-border)] bg-slate-50 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bebas text-xl opacity-40">TARGET PROGRESS</span>
                        <span className="font-space font-black">
                          {isHit ? 'MET ✓' : (item.target_price ? `₹${item.target_price.toLocaleString('en-IN')}` : 'TRACKING')}
                        </span>
                      </div>
                      <div className="h-4 bg-white border-[2px] border-[var(--neo-border)] overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (item.best_price / (item.target_price || item.best_price)) * 100)}%` }}
                          className={`h-full ${isHit ? 'bg-[var(--neo-green)]' : 'bg-[var(--neo-pink)]'}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <a 
                    href={getDirectLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[var(--neo-green)] text-[#1A1A1A] font-bebas text-3xl py-3 flex items-center justify-center gap-2 hover:bg-[var(--neo-yellow)] transition-all shadow-[4px_4px_0_0_var(--neo-shadow)] active:shadow-none active:translate-y-px"
                  >
                    VISIT STORE
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
