import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, FileText, IndianRupee, Loader2, Target, CheckCircle2 } from 'lucide-react';
import { useNotifications } from './NotificationProvider';
import { useAuth } from '../contexts/AuthContext';

const WatchlistDrawer = ({ isOpen, onClose, onRefreshCount }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const notifiedIds = useRef(new Set());

  const fetchWatchlist = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/watchlist?user_id=${user.uid}`);
      const data = await response.json();
      setItems(data);
      if (onRefreshCount) onRefreshCount(data.length);

      // Check for targets reached
      data.forEach(item => {
        if (item.target_price && item.best_price <= item.target_price) {
          if (!notifiedIds.current.has(item.id)) {
            addNotification(`Target Reached for ${item.product_name}! Now at ₹${item.best_price.toLocaleString('en-IN')}`, 'target');
            notifiedIds.current.add(item.id);
          }
        }
      });
    } catch (err) {
      console.error("Failed to fetch watchlist", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWatchlist();
      setReport(null);
    }
  }, [isOpen]);

  const removeItem = async (id) => {
    try {
      const itemToRemove = items.find(i => i.id === id);
      await fetch(`/api/watchlist/${id}?user_id=${user.uid}`, { method: 'DELETE' });
      addNotification(`Removed ${itemToRemove?.product_name || 'item'} from watchlist`, 'info');
      fetchWatchlist();
    } catch (err) {
      addNotification("Failed to remove item", "error");
    }
  };

  const generateReport = async () => {
    setGeneratingReport(true);
    addNotification("Generating market intelligence report...", "trigger");
    try {
      const response = await fetch(`/api/watchlist/report?user_id=${user.uid}`);
      const data = await response.json();
      setReport(data.report);
      addNotification("Report generated successfully", "success");
    } catch (err) {
      addNotification("Report generation failed", "error");
    } finally {
      setGeneratingReport(false);
    }
  };

  const totalValue = items.reduce((sum, item) => sum + item.best_price, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-white dark:bg-slate-900/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-300 dark:border-slate-700/50 z-[101] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} rounded-l-[3rem] overflow-hidden flex flex-col`}
      >
        <div className="p-8 border-b border-slate-300 dark:border-slate-700/50 flex items-center justify-between bg-slate-100 dark:bg-slate-800/20">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">Smart Watchlist</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Tracking {items.length} premium deals</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="bg-slate-100 dark:bg-slate-800/40 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-300 dark:border-slate-700/50">
                <Trash2 size={24} className="text-slate-600" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Your watchlist is empty.</p>
              <button onClick={onClose} className="mt-4 text-indigo-400 text-sm font-semibold hover:underline">Start scanning for deals</button>
            </div>
          ) : (
            items.map((item) => {
              const isHit = item.target_price && item.best_price <= item.target_price;
              
              return (
                <div 
                  key={item.id} 
                  className={`relative bg-slate-100 dark:bg-slate-800/40 border rounded-3xl p-5 flex items-center justify-between group transition-all duration-500 ${isHit ? 'border-emerald-500/40 shadow-[0_0_20px_-10px_rgba(16,185,129,0.2)]' : 'border-slate-300 dark:border-slate-700/30 hover:border-slate-500'}`}
                >
                  {isHit && (
                    <div className="absolute -top-2 -left-2 bg-emerald-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-emerald-500/20 z-10 animate-bounce">
                      <CheckCircle2 size={10} /> TARGET REACHED
                    </div>
                  )}

                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate text-lg">{item.product_name}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-2.5 py-1 rounded-lg border border-indigo-500/20 uppercase tracking-widest">{item.best_platform}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-black ${isHit ? 'text-emerald-400' : 'text-slate-100'}`}>₹{item.best_price?.toLocaleString('en-IN')}</span>
                        {!isHit && item.target_price && (
                          <span className="text-[9px] font-black text-indigo-400/70 bg-indigo-500/5 px-2 py-0.5 rounded-full border border-indigo-500/10">
                            -{((item.best_price - item.target_price) / item.best_price * 100).toFixed(1)}% to goal
                          </span>
                        )}
                      </div>
                      
                      {item.target_price && (
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border ${isHit ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white dark:bg-slate-900/50 border-slate-300 dark:border-slate-700/50 text-slate-500'}`}>
                          <Target size={10} />
                          <span className="text-[9px] font-bold uppercase tracking-wider">Goal: ₹{item.target_price.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all opacity-0 group-hover:opacity-100 shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })
          )}

          {report && (
            <div className="mt-8 bg-white dark:bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden animate-in zoom-in duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl" />
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText size={16} /> Generated Report
              </h3>
              <div className="text-xs text-indigo-100/70 whitespace-pre-wrap font-mono leading-relaxed max-h-60 overflow-y-auto thin-scrollbar">
                {report}
              </div>
              <button 
                onClick={() => setReport(null)}
                className="mt-6 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-200 transition-colors uppercase tracking-widest"
              >
                Dismiss Report
              </button>
            </div>
          )}
        </div>

        <div className="p-8 bg-slate-100 dark:bg-slate-800/40 border-t border-slate-300 dark:border-slate-700/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 font-bold tracking-[0.2em] text-[10px] uppercase">TOTAL MONITORED VALUE</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white flex items-center transition-all group-hover:scale-110">
              <IndianRupee size={20} className="text-emerald-500" />
              {totalValue.toLocaleString('en-IN')}
            </span>
          </div>
          
          <button 
            onClick={generateReport}
            disabled={items.length === 0 || generatingReport}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-200 dark:bg-slate-700 disabled:text-slate-500 text-slate-900 dark:text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-500/10 active:scale-95"
          >
            {generatingReport ? <Loader2 className="animate-spin" size={20} /> : <FileText size={20} />}
            Generate Summary Report
          </button>
        </div>
      </div>
    </>
  );
};

export default WatchlistDrawer;
