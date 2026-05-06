import React from 'react';
import { ArrowDown } from 'lucide-react';

const DealTicker = () => {
  const deals = [
    "iPhone 15 Pro dropped ₹4,500 on Amazon",
    "Sony PlayStation 5 just hit all-time low at Reliance Digital",
    "MacBook Air M3 discounted by 12% on Croma",
    "Samsung Galaxy S24 Ultra price slashed by ₹8,000 on Flipkart",
    "Sony WH-1000XM5 down to ₹24,990 limited time offer"
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 ticker-wrap h-10 flex items-center border-b border-indigo-500/20 backdrop-blur-md">
      <div className="ticker-content">
        {deals.map((deal, i) => (
          <div key={i} className="ticker-item flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {deal}
            <ArrowDown size={14} className="text-emerald-400" />
            <span className="mx-8 text-slate-600">|</span>
          </div>
        ))}
        {/* Repeat for seamless loop */}
        {deals.map((deal, i) => (
          <div key={`repeat-${i}`} className="ticker-item flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {deal}
            <ArrowDown size={14} className="text-emerald-400" />
            <span className="mx-8 text-slate-600">|</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealTicker;
