import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ResearchHub from './ResearchHub';

const ResearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8 pb-16">
      {/* SEARCH Section */}
      <section className="relative z-20">
        <div className="bg-white border-[3px] border-[var(--neo-border)] p-1 shadow-[6px_6px_0_0_var(--neo-shadow)] max-w-3xl mx-auto">
          <div className="flex px-4 pt-1 pb-1 gap-2 border-b-[2px] border-[var(--neo-border)] mb-1 bg-slate-50">
             <span className="font-bebas text-lg pt-1 tracking-tight text-[#1A1A1A]">START NEW SEARCH</span>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const val = e.target.search.value;
              if (val) setSearchQuery(val);
            }} 
            className="relative flex items-center p-2 bg-[#FDFCF0]"
          >
            <div className="absolute left-8 text-[#1A1A1A] pointer-events-none opacity-40">
              <Search size={24} strokeWidth={3} />
            </div>
            <input 
              name="search"
              type="text"
              defaultValue={searchQuery}
              placeholder="Enter product name..."
              className="w-full bg-white border-[2px] border-[var(--neo-border)] py-4 pl-16 pr-32 focus:bg-white outline-none transition-all placeholder:text-[#1A1A1A]/20 font-bebas text-2xl tracking-tight"
            />
            <button 
              type="submit"
              className="absolute right-6 bg-[var(--neo-green)] text-[#1A1A1A] hover:bg-[var(--neo-yellow)] border-[2px] border-[var(--neo-border)] py-2.5 px-6 font-bebas text-xl shadow-[4px_4px_0_0_var(--neo-shadow)] active:shadow-none transition-all"
            >
              SEARCH
            </button>
          </form>
        </div>
      </section>

      {/* RESULTS Section */}
      <section id="research-results" className="pt-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[var(--neo-border)] text-white shadow-[4px_4px_0_0_var(--neo-shadow)] border-[2px] border-[var(--neo-border)]">
            <Search size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-bebas tracking-tighter uppercase leading-none text-[#1A1A1A]">Market Analysis</h2>
            <p className="font-bold text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mt-1">Live results from across the web</p>
          </div>
        </div>
        
        <div className="bg-white border-[3px] border-[var(--neo-border)] p-1 shadow-[8px_8px_0_0_var(--neo-shadow)] relative overflow-hidden group">
          <div className="p-6">
            <ResearchHub searchQuery={searchQuery} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResearchPage;
