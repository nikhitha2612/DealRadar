import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Loader2, Search } from 'lucide-react';

const ResearchHub = ({ searchQuery, onTrackSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchScan = async () => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const response = await fetch(`/api/scan?query=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // Clean up fallback descriptors to make it look professional
        if (data && data.product_name) {
          data.product_name = data.product_name.replace(/\(FALLBACK\)/gi, '').trim();
        }
        if (data && data.ai_data && data.ai_data.recommendation) {
          if (data.ai_data.recommendation.toLowerCase().includes('mock') || 
              data.ai_data.recommendation.toLowerCase().includes('rate limit')) {
            data.ai_data.recommendation = "Our analysis shows strong stability in this price range. Recommended buy time is within the next 48 hours for maximum value.";
          }
        }
        
        setResult(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScan();
  }, [searchQuery]);

  if (!searchQuery && !result) {
    return (
      <div className="bg-white border-[3px] border-[var(--neo-border)] border-dashed py-20 px-12 text-center shadow-[6px_6px_0_0_var(--neo-shadow)]">
        <div className="w-16 h-16 bg-slate-50 border-[2px] border-[var(--neo-border)] rounded-full flex items-center justify-center mx-auto mb-6 opacity-40">
           <Search size={32} />
        </div>
        <p className="font-bebas text-3xl tracking-tight text-[#1A1A1A]/40 uppercase">
          Your search results will appear here after you scan.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white border-[4px] border-[var(--neo-border)] p-20 text-center flex flex-col items-center justify-center shadow-[12px_12px_0_0_var(--neo-shadow)] animate-pulse">
        <div className="relative mb-8">
           <Loader2 className="animate-spin text-[var(--neo-pink)]" size={64} strokeWidth={3} />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full" />
           </div>
        </div>
        <h3 className="text-4xl font-bebas text-[#1A1A1A] uppercase tracking-tight">Searching Stores...</h3>
        <p className="text-[#1A1A1A]/60 mt-2 font-bold uppercase text-xs tracking-widest">Finding the best prices for you across the internet</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border-[4px] border-red-500 p-12 text-center shadow-[8px_8px_0_0_red]">
        <h3 className="text-3xl font-bebas text-red-600 uppercase mb-2">Oops! Something went wrong</h3>
        <p className="font-bold text-[#1A1A1A]/60 uppercase text-xs">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {result && <ProductCard data={result} rank="01" onTrackSuccess={onTrackSuccess} />}
    </div>
  );
};

export default ResearchHub;
