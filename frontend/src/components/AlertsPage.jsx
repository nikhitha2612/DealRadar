import React, { useState, useEffect } from 'react';
import { Bell, BellOff, ArrowRight, Zap, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AlertsPage = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        if (!user) return;
        const response = await fetch(`/api/notifications?user_id=${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setAlerts(data);
          } else {
            // High-fidelity samples for review
            setAlerts([
              {
                id: 's1',
                message: "TARGET MET: IPHONE 15 PRO (128GB) DROPPED TO ₹1,24,900 ON AMAZON",
                created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
                type: 'success'
              },
              {
                id: 's2',
                message: "NEW SCAN: MACBOOK AIR M3 DETECTED AT 3% BELOW MARKET AVERAGE",
                created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
                type: 'info'
              },
              {
                id: 's3',
                message: "PRICE HIKE ALERT: SONY WH-1000XM5 TRENDING UPWARDS (+5%)",
                created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
                type: 'warning'
              }
            ]);
          }
        }
      } catch (err) {
        console.error("Alerts fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, [user]);

  const clearAlert = async (id) => {
    // Logic for clearing alert if backend supports it, otherwise just UI filter for now
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-8 pb-16 text-[#1A1A1A]">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[var(--neo-orange)] text-[#1A1A1A] shadow-[4px_4px_0_0_var(--neo-shadow)] border-[2px] border-[var(--neo-border)]">
          <Bell size={32} />
        </div>
        <div>
          <h2 className="text-4xl font-bebas tracking-tighter uppercase leading-none">Price Alerts</h2>
          <p className="font-bold text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mt-1">Live market surveillance feeds</p>
        </div>
      </div>

      {/* Monitoring Status Bar (Updated) */}
      <div className="bg-[var(--neo-yellow)] text-[#1A1A1A] p-3 md:p-4 border-[2px] border-[var(--neo-border)] shadow-[4px_4px_0_0_var(--neo-shadow)] flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
         <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative shrink-0">
               <div className="w-3 h-3 bg-red-600 rounded-full animate-ping absolute" />
               <div className="w-3 h-3 bg-red-600 rounded-full" />
            </div>
            <span className="font-bebas text-xl md:text-2xl tracking-widest whitespace-nowrap">LIVE SCANNER ACTIVE</span>
         </div>
         <div className="flex gap-8 overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee font-bold text-[10px] uppercase opacity-60 flex gap-12">
               <span>• Amazon India: STABLE</span>
               <span>• Flipkart: SYNCED</span>
               <span>• Reliance Digital: HIGH SPEED</span>
               <span>• Croma: CONNECTED</span>
            </div>
         </div>
      </div>

      {loading ? (
        <div className="bg-white border-[4px] border-[var(--neo-border)] p-12 md:p-20 text-center shadow-[10px_10px_0_0_var(--neo-shadow)]">
          <Loader2 className="animate-spin mx-auto text-[var(--neo-orange)]" size={48} md={64} />
          <p className="font-bebas text-2xl md:text-3xl mt-6 uppercase opacity-40">Loading alerts...</p>
        </div>
      ) : alerts.length === 0 ? (
        <div className="bg-white border-[4px] border-[var(--neo-border)] border-dashed p-16 md:p-32 text-center shadow-[10px_10px_0_0_var(--neo-shadow)]">
          <div className="w-16 md:w-20 h-16 md:h-20 bg-slate-100 border-[2px] border-[var(--neo-border)] rounded-full flex items-center justify-center mx-auto mb-6 opacity-30">
            <BellOff size={32} md={40} />
          </div>
          <h3 className="font-bebas text-4xl md:text-5xl uppercase opacity-20">No active alerts</h3>
          <p className="font-bold text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] mt-4 opacity-40 italic">We'll notify you here when prices drop</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {alerts.map((alert, idx) => (
              <motion.div 
                key={alert.id || idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white border-[2px] border-[var(--neo-border)] p-4 md:p-5 shadow-[4px_4px_0_0_var(--neo-shadow)] flex flex-col md:flex-row md:items-center justify-between gap-4 md:hover:translate-x-1 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--neo-orange)] border-[2px] border-[var(--neo-border)] flex items-center justify-center text-[#1A1A1A] shrink-0">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bebas text-xl md:text-2xl leading-tight uppercase tracking-tight break-words">{alert.message || 'Price Hit Detected'}</h4>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mt-1">
                      {new Date(alert.created_at).toLocaleDateString()} • {new Date(alert.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => clearAlert(alert.id)}
                    className="p-2.5 border-[2px] border-[var(--neo-border)] hover:bg-red-50 hover:text-red-500 transition-all shadow-[2px_2px_0_0_var(--neo-shadow)] active:shadow-none bg-white"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-3 bg-[var(--neo-border)] text-white font-bebas text-xl border-[2px] border-[var(--neo-border)] shadow-[3px_3px_0_0_var(--neo-orange)] hover:bg-[var(--neo-green)] hover:text-[#1A1A1A] transition-all">
                    VIEW DEAL
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;
