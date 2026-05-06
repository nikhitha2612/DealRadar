import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Sun, Moon, LogOut, Settings, User } from 'lucide-react';

const Header = ({ onSearch, onOpenSettings, onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between mb-8 py-4 border-b-[3px] border-[var(--neo-border)] gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Hamburger Menu Toggle (Mobile Only) */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 border-[2px] border-[var(--neo-border)] bg-[var(--neo-yellow)] shadow-[3px_3px_0_0_var(--neo-shadow)] active:translate-x-px active:translate-y-px active:shadow-none"
        >
          <div className="w-5 h-5 flex flex-col justify-around">
            <div className="h-0.5 w-full bg-black"></div>
            <div className="h-0.5 w-full bg-black"></div>
            <div className="h-0.5 w-full bg-black"></div>
          </div>
        </button>

        <div className="p-2 bg-[var(--neo-border)] text-white shadow-[3px_3px_0_0_var(--neo-green)] hidden sm:block">
          <Zap size={20} md={24} />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bebas tracking-tight uppercase text-[#1A1A1A] leading-none pt-1">DealRadar</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Quote moved to small pill */}
        <div className="hidden md:flex items-center px-4 py-1.5 border-[2px] border-[var(--neo-border)] bg-white shadow-[2px_2px_0_0_var(--neo-shadow)] -rotate-1">
          <span className="text-[10px] font-black uppercase tracking-widest italic text-[#1A1A1A]">"Your wallet will thank you"</span>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-3 border-[2px] border-[var(--neo-border)] bg-white shadow-[3px_3px_0_0_var(--neo-shadow)] hover:bg-slate-50 transition-all active:translate-x-px active:translate-y-px active:shadow-none"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user && (
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="group flex items-center gap-2 pr-4 bg-[var(--neo-border)] text-white border-[2px] border-[var(--neo-border)] shadow-[3px_3px_0_0_var(--neo-pink)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
            >
              <div className="w-12 h-12 border-r-[2px] border-[var(--neo-border)] overflow-hidden bg-white">
                <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <span className="font-bebas text-xl hidden sm:inline">{user.displayName || 'ME'}</span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white border-[4px] border-[var(--neo-border)] shadow-[8px_8px_0_0_var(--neo-shadow)] z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b-[2px] border-[var(--neo-border)] mb-2 bg-slate-50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">User Profile</p>
                  <p className="text-sm font-bold text-[#1A1A1A] truncate leading-tight">{user.email}</p>
                </div>
                <button 
                  onClick={() => { onOpenSettings(); setShowUserMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black hover:bg-[var(--neo-yellow)] transition-colors text-left font-bebas text-xl text-[#1A1A1A]"
                >
                  <Settings size={18} /> Account Settings
                </button>
                <button 
                  onClick={() => { handleLogout(); setShowUserMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-red-600 hover:bg-red-50 transition-colors text-left font-bebas text-xl"
                >
                  <LogOut size={18} /> Sign Out (Away)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
