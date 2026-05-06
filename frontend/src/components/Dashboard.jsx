import React, { useState, useEffect } from 'react';
import { IndianRupee, Activity, Target, BellRing } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Dashboard = ({ refreshTrigger }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalItems: 0,
    totalValue: 0,
    targetsHit: 0,
    activeAlerts: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user) return;
        const [watchlistRes, notifsRes] = await Promise.all([
          fetch(`/api/watchlist?user_id=${user.uid}`),
          fetch(`/api/notifications?user_id=${user.uid}`)
        ]);
        
        let items = [];
        let notifs = [];

        if (watchlistRes.ok) items = await watchlistRes.json();
        if (notifsRes.ok) notifs = await notifsRes.json();
        
        let value = 0;
        let hits = 0;

        if (Array.isArray(items)) {
          items.forEach(item => {
            if (item.best_price) value += item.best_price;
            if (item.target_price && item.best_price <= item.target_price) {
              hits += 1;
            }
          });
        }

        setStats({
          totalItems: Array.isArray(items) ? items.length : 0,
          totalValue: value,
          targetsHit: hits,
          activeAlerts: Array.isArray(notifs) ? notifs.length : 0
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchDashboardData();
  }, [refreshTrigger, user]);

  const statCards = [
    { label: "Items Tracked", value: stats.totalItems, icon: Activity, color: "bg-[var(--neo-green)]", sub: "Active searches" },
    { label: "Total Value", value: stats.totalValue.toLocaleString('en-IN'), icon: IndianRupee, color: "bg-[var(--neo-yellow)]", sub: "Monitored assets" },
    { label: "Targets Hit", value: stats.targetsHit, icon: Target, color: "bg-[var(--neo-pink)]", sub: "Best prices found" },
    { label: "Smart Alerts", value: stats.activeAlerts, icon: BellRing, color: "bg-[var(--neo-orange)]", sub: "Unread notifications" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {statCards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative cursor-pointer"
        >
          {/* Main Card */}
          <div className={`p-8 border-[3px] border-[var(--neo-border)] ${card.color} shadow-[6px_6px_0_0_var(--neo-shadow)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_0_var(--neo-shadow)] transition-all active:translate-x-px active:translate-y-px active:shadow-none min-h-[180px] flex flex-col justify-between`}>
            {/* Design elements */}
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white border-[3px] border-[var(--neo-border)] flex items-center justify-center shadow-[4px_4px_0_0_var(--neo-shadow)] group-hover:bg-[var(--neo-border)] group-hover:text-white transition-colors duration-300">
                <card.icon size={32} strokeWidth={2.5} />
              </div>
            </div>

            <div className="text-[#1A1A1A]">
              <div className="font-bebas text-6xl leading-none mb-1 tracking-tighter">
                {card.label === "Total Value" ? `₹${card.value}` : card.value}
              </div>
              <div className="flex flex-col">
                <span className="font-bebas text-2xl uppercase tracking-tight leading-none">{card.label}</span>
                <span className="text-[10px] font-black uppercase text-[#1A1A1A]/40 tracking-[0.1em] mt-1">{card.sub}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Dashboard;
