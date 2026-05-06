import React from 'react';
import MarketSegments from './MarketSegments';
import { TrendingUp } from 'lucide-react';

const MarketPage = () => {
  return (
    <div className="space-y-8 pb-16 text-[#1A1A1A]">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[var(--neo-yellow)] text-[#1A1A1A] shadow-[4px_4px_0_0_var(--neo-shadow)] border-[2px] border-[var(--neo-border)]">
          <TrendingUp size={32} />
        </div>
        <div>
          <h2 className="text-4xl font-bebas tracking-tighter uppercase leading-none text-[#1A1A1A]">Market Analysis</h2>
          <p className="font-bold text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mt-1">Real-time trending across India</p>
        </div>
      </div>

      <div className="bg-white border-[3px] border-[var(--neo-border)] p-8 shadow-[6px_6px_0_0_var(--neo-shadow)]">
         <div className="mb-8 border-b-[2px] border-[var(--neo-border)] pb-6 border-dashed">
            <h3 className="font-bebas text-2xl mb-1">Browse Hot Categories</h3>
            <p className="font-bold text-[9px] uppercase tracking-widest opacity-40">Direct marketplace category intelligence</p>
         </div>
         <MarketSegments onAction={(name) => window.location.href = `/dashboard/research?q=${name}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[var(--neo-green)] p-6 border-[3px] border-[var(--neo-border)] shadow-[4px_4px_0_0_var(--neo-shadow)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <h4 className="font-bebas text-2xl mb-1">VOLATILITY INDEX</h4>
            <p className="font-bold text-[9px] uppercase opacity-60 mb-3">24H PRICE MOVEMENT</p>
            <div className="text-4xl font-black">12.4%</div>
            <p className="text-[11px] font-bold mt-4 leading-tight">Electronics market is peaking. Low volatility detected for 48 hours.</p>
         </div>
         <div className="bg-[var(--neo-pink)] p-6 border-[3px] border-[var(--neo-border)] shadow-[4px_4px_0_0_var(--neo-shadow)] text-white hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <h4 className="font-bebas text-2xl mb-1">SAVINGS POOL</h4>
            <p className="font-bold text-[9px] uppercase opacity-60 mb-3">ACTIVE PRICE DROPS</p>
            <div className="text-4xl font-black">2,481</div>
            <p className="text-[11px] font-bold mt-4 leading-tight">Appliances show significant downward trends today.</p>
         </div>
         <div className="bg-[var(--neo-border)] p-6 border-[3px] border-[var(--neo-border)] shadow-[4px_4px_0_0_var(--neo-shadow)] text-white hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <h4 className="font-bebas text-2xl mb-1">NODE SYNC</h4>
            <p className="font-bold text-[9px] uppercase opacity-60 mb-3">LATENCY CHECK</p>
            <div className="text-4xl font-black uppercase">ULTRA-FAST</div>
            <p className="text-[11px] font-bold mt-4 leading-tight">Search nodes currently operating at 100% capacity.</p>
         </div>
      </div>
    </div>
  );
};

export default MarketPage;
