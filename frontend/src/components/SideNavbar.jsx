import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Search, 
  Heart, 
  TrendingUp, 
  Settings, 
  LogOut,
  Zap,
  Bell,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SideNavbar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Search, label: 'Research Lab', path: '/dashboard/research' },
    { icon: Heart, label: 'Watchlist', path: '/dashboard/watchlist' },
    { icon: TrendingUp, label: 'Market Pulse', path: '/dashboard/markets' },
    { icon: Bell, label: 'Price Alerts', path: '/dashboard/alerts' },
  ];

  return (
    <>
      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`
        fixed left-0 top-0 h-screen w-64 bg-white border-r-[3px] border-[var(--neo-border)] 
        flex flex-col z-[100] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand */}
        <div className="p-8 border-b-[3px] border-[var(--neo-border)] flex items-center justify-between bg-[var(--neo-yellow)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--neo-border)] flex items-center justify-center rotate-3 shadow-[3px_3px_0_0_white]">
              <Zap className="text-[var(--neo-yellow)] w-6 h-6" fill="currentColor" />
            </div>
            <h1 className="font-bebas text-4xl tracking-tighter pt-1 uppercase text-[#1A1A1A]">DealRadar</h1>
          </div>
          
          {/* Close button for mobile */}
          <button onClick={onClose} className="lg:hidden text-[#1A1A1A]">
            <ChevronRight className="rotate-180" size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 font-bebas text-2xl transition-all relative group
                ${isActive 
                  ? 'bg-slate-100 text-[#1A1A1A] border-l-[6px] border-[var(--neo-pink)] shadow-[4px_4px_0_0_rgba(0,0,0,0.05)]' 
                  : 'text-[#1A1A1A] hover:bg-slate-50 opacity-60 hover:opacity-100'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={22} strokeWidth={isActive ? 3 : 2} className={isActive ? 'text-[var(--neo-pink)]' : ''} />
                  <span className="pt-1">{item.label}</span>
                  <ChevronRight className={`ml-auto transition-all ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} size={18} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User / Bottom Actions */}
        <div className="p-6 border-t-[3px] border-[var(--neo-border)] space-y-4 bg-slate-50">
          <div className="flex items-center gap-3 p-3 border-[2px] border-[var(--neo-border)] bg-white shadow-[4px_4px_0_0_var(--neo-shadow)]">
            <div className="w-10 h-10 bg-[var(--neo-pink)] border-[2px] border-[var(--neo-border)] flex items-center justify-center font-bebas text-2xl text-white">
              {user?.displayName?.[0] || 'U'}
            </div>
            <div className="truncate">
              <p className="font-bebas text-lg leading-none pt-1 text-[#1A1A1A]">{user?.displayName || 'Active User'}</p>
              <p className="text-[10px] font-space font-black uppercase text-[#1A1A1A]/40 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <NavLink 
              to="/settings" 
              onClick={() => onClose()}
              className="flex-1 border-[2px] border-[var(--neo-border)] p-2 flex items-center justify-center hover:bg-[var(--neo-green)] transition-colors shadow-[3px_3px_0_0_var(--neo-shadow)] active:translate-y-px active:shadow-none bg-white text-[#1A1A1A]"
            >
              <Settings size={20} />
            </NavLink>
            <button 
              onClick={logout}
              className="flex-1 border-[2px] border-[var(--neo-border)] p-2 flex items-center justify-center hover:bg-red-400 transition-colors shadow-[3px_3px_0_0_var(--neo-shadow)] active:translate-y-px active:shadow-none bg-white text-[#1A1A1A]"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideNavbar;
