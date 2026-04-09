import React, { useState, useEffect } from 'react';
import Header from './Header';
import ResearchHub from './ResearchHub';
import MarketSegments from './MarketSegments';
import Dashboard from './Dashboard';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, TrendingUp, Search, Zap } from 'lucide-react';

const MainDashboard = () => {
  const { user } = useAuth();
  const [watchlistCount, setWatchlistCount] = useState(0);

  const fetchWatchlistCount = async () => {
    try {
      if (!user) return;
      const response = await fetch(`/api/watchlist?user_id=${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        setWatchlistCount(data.length);
      }
    } catch (err) {
      console.error("Failed to fetch initial count", err);
    }
  };

  useEffect(() => {
    fetchWatchlistCount();
  }, [user]);

  return (
    <div className="space-y-12 pb-20">
      {/* Welcome Section - Compact & Patterned */}
      <section className="relative overflow-hidden bg-white border-[3px] border-[var(--neo-border)] p-5 md:p-8 shadow-[6px_6px_0_0_var(--neo-shadow)]">
        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 md:gap-6">
             <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--neo-yellow)] border-[3px] border-[var(--neo-border)] flex items-center justify-center rotate-3 shadow-[4px_4px_0_0_var(--neo-shadow)] shrink-0">
                <span className="font-bebas text-5xl pt-1">{user?.displayName?.[0] || 'U'}</span>
             </div>
              <div className="min-w-0">
                <h2 className="text-2xl md:text-4xl font-bebas tracking-tighter leading-none text-[#1A1A1A] mb-1 truncate">
                  WELCOME BACK, {user?.displayName?.split(' ')[0] || 'USER'}
                </h2>
                <p className="font-bold text-[8px] md:text-[10px] uppercase tracking-widest text-[#1A1A1A]/40">
                  Your tracking dashboard is ready for inspection.
                </p>
              </div>
          </div>
                    <div className="flex gap-4">
              <div className="px-6 py-2 bg-[var(--neo-green)] border-[2px] border-[var(--neo-border)] shadow-[3px_3px_0_0_var(--neo-shadow)] rotate-1">
                 <span className="font-bebas text-lg">SYSTEM READY</span>
              </div>
              <div className="px-6 py-2 bg-white border-[2px] border-[var(--neo-border)] shadow-[3px_3px_0_0_var(--neo-shadow)] -rotate-1 hidden lg:block">
                 <span className="font-bebas text-lg uppercase">Build: Final_Release</span>
              </div>
           </div>
        </div>
      </section>

      {/* Quick Summary Feature */}
      <section className="bg-[var(--neo-yellow)] border-[3px] border-[var(--neo-border)] p-4 md:p-6 shadow-[5px_5px_0_0_var(--neo-shadow)] -mt-6">
         <h3 className="font-bebas text-2xl mb-1 uppercase">Today's Session Recap</h3>
         <div className="flex flex-wrap gap-x-6 md:gap-x-12 gap-y-4">
            <div>
               <p className="text-[10px] font-black uppercase opacity-40">Items Scanned</p>
               <p className="text-2xl font-black">1.4K</p>
            </div>
            <div>
               <p className="text-[10px] font-black uppercase opacity-40">Top Bargain</p>
               <p className="text-2xl font-black">Laptops (-₹4,200)</p>
            </div>
            <div>
               <p className="text-[10px] font-black uppercase opacity-40">Search Logic</p>
               <p className="text-2xl font-black">Multi-Site Fusion</p>
            </div>
            <div className="lg:ml-auto">
               <button 
                  onClick={() => window.location.href = '/dashboard/research'}
                  className="bg-white border-[2px] border-[var(--neo-border)] px-6 py-2 font-bebas text-xl shadow-[3px_3px_0_0_var(--neo-border)] hover:bg-black hover:text-white transition-all"
               >
                  NEW SEARCH
               </button>
            </div>
         </div>
      </section>
        
      {/* TOP: Quick Stats */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-l-[6px] border-[var(--neo-green)] pl-4 py-1">
          <div className="p-2 bg-[var(--neo-border)] text-white shadow-[4px_4px_0_0_var(--neo-shadow)]">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h2 className="text-4xl font-bebas tracking-tight uppercase leading-none text-[#1A1A1A]">Live Overview</h2>
            <p className="text-[10px] font-black uppercase text-[#1A1A1A]/40 mt-1">Real-time tracking status</p>
          </div>
        </div>
        <Dashboard refreshTrigger={watchlistCount} />
      </section>

      {/* MID: Market Pulse Preview */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 border-l-[6px] border-[var(--neo-pink)] pl-4 py-1">
          <div className="p-2 bg-[var(--neo-border)] text-white shadow-[4px_4px_0_0_var(--neo-shadow)]">
            <TrendingUp size={24} />
          </div>
          <div>
            <h2 className="text-4xl font-bebas tracking-tight uppercase leading-none text-[#1A1A1A]">Market Snapshots</h2>
            <p className="text-[10px] font-black uppercase text-[#1A1A1A]/40 mt-1">Latest trending categories</p>
          </div>
        </div>
        <div className="bg-white border-[3px] border-[var(--neo-border)] p-5 md:p-10 shadow-[8px_8px_0_0_var(--neo-shadow)] overflow-x-hidden">
          <MarketSegments onAction={(name) => window.location.href = `/dashboard/research?q=${name}`} />
        </div>
      </section>

      {/* BOTTOM: Smart Insights (New Feature) */}
      <section className="space-y-6 pt-10 border-t-[2px] border-[var(--neo-border)] border-dashed">
         <div className="flex items-center gap-4">
            <div className="p-2 bg-[var(--neo-yellow)] border-[2px] border-[var(--neo-border)] shadow-[3px_3px_0_0_var(--neo-shadow)]">
               <Zap size={24} />
            </div>
            <h3 className="font-bebas text-4xl tracking-tight uppercase text-[#1A1A1A]">Smart Insights</h3>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border-[3px] border-[var(--neo-border)] p-6 shadow-[5px_5px_0_0_var(--neo-shadow)] group hover:bg-[var(--neo-green)] transition-colors cursor-help">
               <h4 className="font-bebas text-2xl mb-2 group-hover:text-black">Best Buy Time</h4>
               <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50 group-hover:text-black/60">Electronics</p>
               <p className="mt-4 text-sm font-medium leading-relaxed">Weekends between 2 AM - 5 AM show the highest frequency of flash sales for Laptops.</p>
            </div>
            <div className="bg-slate-50 border-[3px] border-[var(--neo-border)] p-6 shadow-[5px_5px_0_0_var(--neo-shadow)] group hover:bg-[var(--neo-pink)] transition-colors cursor-help">
               <h4 className="font-bebas text-2xl mb-2 group-hover:text-white transition-colors">Price Volatility</h4>
               <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50 group-hover:text-white/60 transition-colors">Smartphones</p>
               <p className="mt-4 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">High volatility detected. Prices are shifting every 6 hours due to upcoming festival season.</p>
            </div>
            <div className="bg-slate-50 border-[3px] border-[var(--neo-border)] p-6 shadow-[5px_5px_0_0_var(--neo-shadow)] group hover:bg-[var(--neo-yellow)] transition-colors cursor-help">
               <h4 className="font-bebas text-2xl mb-2 group-hover:text-black">Target Prediction</h4>
               <p className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50 group-hover:text-black/60">Success Rate</p>
               <p className="mt-4 text-sm font-medium leading-relaxed">84% of your watchlisted items are predicted to hit their target price within 12 days.</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default MainDashboard;
