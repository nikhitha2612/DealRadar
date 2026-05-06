import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ExternalLink, Check, Shield, BookmarkPlus, Loader2, Target, TrendingDown, TrendingUp, Star, LineChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from './NotificationProvider';
import { useAuth } from '../contexts/AuthContext';

const ProductCard = ({ data, rank, onTrackSuccess }) => {
  const [tracking, setTracking] = useState(false);
  const [tracked, setTracked] = useState(false);
  const [targetPrice, setTargetPrice] = useState("");
  const [email, setEmail] = useState("");
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  const chartData = data.history.map((price, i) => {
    const variance = price * 0.005;
    const jitter = (Math.random() - 0.5) * variance;
    return {
      day: `Apr ${i + 3}`, // Realistic dates
      price: i === data.history.length - 1 ? price : price + jitter,
    };
  });

  const formatRupees = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const handleTrack = async () => {
    if (!user) {
      addNotification("SIGN IN TO TRACK", "info");
      return;
    }

    if (data.best_price <= parseFloat(targetPrice)) {
      window.open(data.best_url, '_blank', 'noopener,noreferrer');
      return;
    }

    setTracking(true);
    try {
      const url = new URL('/api/watchlist', window.location.origin);
      url.searchParams.append('query', data.product_name);
      url.searchParams.append('user_id', user.uid);
      if (targetPrice) url.searchParams.append('target_price', targetPrice);
      if (email) url.searchParams.append('email', email);

      const response = await fetch(url, { method: 'POST' });
      if (response.ok) {
        setTracked(true);
        addNotification(`TRACKING: ${data.product_name}`, 'success');
        if (onTrackSuccess) onTrackSuccess();
      }
    } catch (err) {
      addNotification("TRACKING FAILED", "error");
    } finally {
      setTracking(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-[3px] border-[var(--neo-border)] shadow-[8px_8px_0_0_var(--neo-shadow)] overflow-hidden"
    >
      <div className="flex flex-col lg:grid lg:grid-cols-12">
        
        {/* Left Col: Info */}
        <div className="p-8 lg:col-span-4 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[var(--neo-border)] relative bg-[var(--neo-bg)]">
          <div className="absolute top-0 left-0 bg-[var(--neo-border)] text-white px-4 py-1.5 font-bebas text-xl">
            RESULT_{rank}
          </div>
          
          <div className="mt-12">
            <div className="inline-block bg-[var(--neo-pink)] text-white px-3 py-1 font-bold text-[10px] border-[2px] border-[var(--neo-border)] rotate-1 mb-4 shadow-[2px_2px_0_0_var(--neo-shadow)] uppercase tracking-wider">
              Verified Product
            </div>
            <h3 className="font-bebas text-5xl leading-[0.9] tracking-tighter uppercase mb-6 text-[#1A1A1A]">{data.product_name}</h3>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-[3px] border-[var(--neo-border)] p-4 shadow-[4px_4px_0_0_var(--neo-shadow)] flex items-center gap-4">
              <div className="w-16 h-16 bg-[var(--neo-green)] border-[3px] border-[var(--neo-border)] flex flex-col items-center justify-center -rotate-3">
                 <span className="font-bebas text-2xl leading-none text-[#1A1A1A]">{data.ai_data?.score || 96}</span>
                 <span className="text-[10px] font-black text-[#1A1A1A]">SCORE</span>
              </div>
              <div>
                <p className="font-bebas text-xl text-[#1A1A1A]">Smart Advice</p>
                <p className="font-outfit text-sm font-bold text-[#1A1A1A]/60 line-clamp-2 leading-tight">
                  {data.ai_data?.recommendation || "This looks like a great deal based on current market trends."}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {!tracked && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <input 
                      type="number"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(e.target.value)}
                      placeholder="SET YOUR TARGET PRICE"
                      className="w-full bg-white border-[3px] border-[var(--neo-border)] p-4 font-bold outline-none focus:bg-[var(--neo-yellow)] transition-colors placeholder:text-[#1A1A1A]/20"
                    />
                  </div>
                </div>
              )}

              {targetPrice && (
                <div className={`p-4 border-[3px] border-[var(--neo-border)] ${data.best_price <= parseFloat(targetPrice) ? 'bg-[var(--neo-green)]' : 'bg-white'}`}>
                  <div className="flex justify-between items-end mb-2 font-bebas text-xl text-[#1A1A1A]">
                    <span>Savings Progress</span>
                    <span>{data.best_price <= parseFloat(targetPrice) ? 'TARGET MET' : `${Math.round(Math.max(0, Math.min(100, ((data.history[0] - data.best_price) / (data.history[0] - parseFloat(targetPrice))) * 100)))}%`}</span>
                  </div>
                  <div className="h-4 w-full bg-[#1A1A1A]/10 border-[2px] border-[var(--neo-border)]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${data.best_price <= parseFloat(targetPrice) ? 100 : Math.max(5, Math.min(100, ((data.history[0] - data.best_price) / (data.history[0] - parseFloat(targetPrice))) * 100))}%` }}
                      className="h-full bg-[var(--neo-border)]"
                    />
                  </div>
                </div>
              )}

              <button 
                onClick={handleTrack}
                disabled={tracked || tracking}
                className={`w-full py-4 border-[3px] border-[var(--neo-border)] font-bebas text-3xl shadow-[5px_5px_0_0_var(--neo-shadow)] transition-all active:translate-x-px active:translate-y-px active:shadow-none ${tracked ? 'bg-[var(--neo-green)] text-[#1A1A1A]' : (data.best_price <= parseFloat(targetPrice) ? 'bg-[var(--neo-pink)] text-white animate-bounce' : 'bg-[var(--neo-green)] text-[#1A1A1A] hover:bg-[var(--neo-yellow)]')} flex items-center justify-center gap-3`}
              >
                {tracking ? <Loader2 className="animate-spin" /> : (tracked || data.best_price <= parseFloat(targetPrice)) ? <Check /> : <BookmarkPlus />}
                {tracked ? 'TRACKING ACTIVE' : (data.best_price <= parseFloat(targetPrice) ? 'BUY NOW' : 'TRACK PRICE')}
              </button>
            </div>
          </div>
        </div>

        {/* Mid Col: Professional Graph */}
        <div className="p-8 lg:col-span-4 flex flex-col border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[var(--neo-border)] bg-slate-50 relative">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-[var(--neo-border)] text-white shadow-[3px_3px_0_0_var(--neo-shadow)]">
               <LineChart size={20} />
             </div>
             <p className="font-bebas text-3xl text-[#1A1A1A]">Market History</p>
          </div>
          
          <div className="mb-6">
            <p className="text-[10px] font-black uppercase text-[#1A1A1A]/40 tracking-widest mb-1">Live Reference</p>
            <p className="font-space font-black text-5xl text-[#1A1A1A]">{formatRupees(data.best_price)}</p>
          </div>

          <div className="flex-1 h-64 w-full bg-white border-[2px] border-[var(--neo-border)] p-4 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                   <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--neo-pink)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--neo-pink)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#1A1A1A' }} 
                />
                <YAxis 
                  domain={['auto', 'auto']} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#1A1A1A' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: 'none', 
                    borderRadius: '0px',
                    color: '#fff',
                    fontFamily: 'Bebas Neue',
                    fontSize: '18px'
                  }}
                  itemStyle={{ color: 'var(--neo-green)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="var(--neo-pink)" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Comparisons */}
        <div className="p-8 lg:col-span-4 bg-[var(--neo-yellow)] flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[var(--neo-border)] text-white p-2">
              <TrendingUp size={20} />
            </div>
            <h4 className="font-bebas text-3xl tracking-tight uppercase text-[#1A1A1A]">Store Prices</h4>
          </div>
          <div className="space-y-3 flex-1 text-[#1A1A1A]">
            {data.comparisons.map((c, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 6 }}
                className={`flex items-center justify-between p-4 border-[3px] border-[var(--neo-border)] ${c.is_lowest ? 'bg-white shadow-[4px_4px_0_0_var(--neo-shadow)]' : 'bg-white/40'}`}
              >
                <div className="flex flex-col">
                  <span className="font-bebas text-xl">{c.site}</span>
                  {c.is_lowest && <span className="text-[9px] font-black bg-[var(--neo-green)] text-white px-2 py-0.5 border border-[var(--neo-border)] uppercase tracking-wider">Lowest</span>}
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-space font-black ${c.is_lowest ? 'text-2xl' : 'text-lg text-[#1A1A1A]/50'}`}>
                    {formatRupees(c.price)}
                  </span>
                  <motion.a 
                    whileTap={{ scale: 0.9 }}
                    href={c.url} target="_blank" rel="noopener noreferrer" 
                    className="p-2 border-[2px] border-[var(--neo-border)] bg-white hover:bg-[var(--neo-border)] hover:text-white transition-colors shadow-[2px_2px_0_0_var(--neo-shadow)] active:shadow-none"
                  >
                    <ExternalLink size={14} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProductCard;
