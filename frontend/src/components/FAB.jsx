import React from 'react';
import { BellRing } from 'lucide-react';

const FAB = ({ count, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all hover:-translate-y-1 group flex items-center gap-0 hover:gap-3 overflow-hidden"
    >
      <div className="relative">
        <BellRing size={24} className="group-hover:animate-bounce" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 animate-in zoom-in">
            {count}
          </span>
        )}
      </div>
      <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 font-semibold whitespace-nowrap">
        View Watchlist
      </span>
    </button>
  );
};

export default FAB;
