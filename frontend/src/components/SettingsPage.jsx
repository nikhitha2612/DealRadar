import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, Bell, Shield, User, Globe, Lock, Trash2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  const { profile, updateProfileSettings, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(profile?.notification_settings || { email: true, browser: true });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfileSettings({ notification_settings: settings });
    } catch (err) {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 text-[#1A1A1A]">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[var(--neo-green)] text-[#1A1A1A] shadow-[4px_4px_0_0_var(--neo-shadow)] border-[2px] border-[var(--neo-border)]">
          <Settings size={32} />
        </div>
        <div>
          <h2 className="text-4xl font-bebas tracking-tighter uppercase leading-none">Settings</h2>
          <p className="font-bold text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile & Account */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border-[3px] border-[var(--neo-border)] p-8 shadow-[8px_8px_0_0_var(--neo-shadow)]">
            <div className="flex items-center gap-4 mb-8 border-b-[2px] border-dashed border-[var(--neo-border)] pb-6">
               <div className="p-2 bg-[var(--neo-yellow)] border-[2px] border-[var(--neo-border)]">
                  <User size={24} />
               </div>
               <h3 className="font-bebas text-3xl uppercase">User Profile</h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">Display Name</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={profile?.email?.split('@')[0].toUpperCase() || 'USER'} 
                    className="w-full bg-slate-50 border-[2px] border-[var(--neo-border)] py-3 px-4 font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 block">Email Anchor</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={profile?.email || ''} 
                    className="w-full bg-slate-50 border-[2px] border-[var(--neo-border)] py-3 px-4 font-bold outline-none opacity-60"
                  />
                </div>
              </div>

              <div className="pt-4">
                 <button className="bg-[var(--neo-yellow)] border-[2px] border-[var(--neo-border)] px-6 py-2 font-bebas text-xl shadow-[3px_3px_0_0_var(--neo-shadow)] hover:bg-[var(--neo-green)] transition-all">
                    REQUEST EMAIL CHANGE
                 </button>
              </div>
            </div>
          </section>

          <section className="bg-white border-[3px] border-[var(--neo-border)] p-8 shadow-[8px_8px_0_0_var(--neo-shadow)]">
            <div className="flex items-center gap-4 mb-8 border-b-[2px] border-dashed border-[var(--neo-border)] pb-6">
               <div className="p-2 bg-[var(--neo-pink)] text-white border-[2px] border-[var(--neo-border)]">
                  <Bell size={24} />
               </div>
               <h3 className="font-bebas text-3xl uppercase">Notifications</h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-slate-50 border-[2px] border-[var(--neo-border)] cursor-pointer hover:bg-[var(--neo-yellow)] transition-all">
                <div className="flex flex-col">
                  <span className="text-[#1A1A1A] font-bebas text-2xl tracking-tight">Email Notifications</span>
                  <span className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase">Get alerted when prices hit your target</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.email}
                  onChange={e => setSettings({...settings, email: e.target.checked})}
                  className="w-8 h-8 border-[3px] border-[var(--neo-border)] bg-white text-[var(--neo-green)] focus:ring-0 transition-all cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-50 border-[2px] border-[var(--neo-border)] cursor-pointer hover:bg-[var(--neo-pink)] transition-all">
                <div className="flex flex-col">
                  <span className="text-[#1A1A1A] font-bebas text-2xl tracking-tight">Browser Alerts</span>
                  <span className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase">Show desktop notifications while browsing</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.browser}
                  onChange={e => setSettings({...settings, browser: e.target.checked})}
                  className="w-8 h-8 border-[3px] border-[var(--neo-border)] bg-white text-[var(--neo-green)] focus:ring-0 transition-all cursor-pointer"
                />
              </label>

              <div className="pt-6">
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full bg-[var(--neo-green)] border-[3px] border-[var(--neo-border)] py-4 font-bebas text-2xl shadow-[4px_4px_0_0_var(--neo-shadow)] hover:bg-[var(--neo-yellow)] transition-all"
                >
                  {loading ? 'SYNCING...' : 'SAVE CONFIGURATION'}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Security & System */}
        <div className="space-y-8">
           <section className="bg-white border-[3px] border-[var(--neo-border)] p-8 shadow-[8px_8px_0_0_var(--neo-shadow)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-[var(--neo-orange)] border-[2px] border-[var(--neo-border)]">
                    <Shield size={24} />
                </div>
                <h3 className="font-bebas text-2xl uppercase">Security</h3>
              </div>
              <div className="space-y-3">
                 <button className="w-full text-left p-3 border-[2px] border-[var(--neo-border)] font-bold text-xs uppercase hover:bg-slate-50 transition-all flex justify-between items-center">
                    Change Access Pin <Lock size={14} />
                 </button>
                 <button className="w-full text-left p-3 border-[2px] border-[var(--neo-border)] font-bold text-xs uppercase hover:bg-slate-50 transition-all flex justify-between items-center">
                    Localization: India (₹) <Globe size={14} />
                 </button>
              </div>
           </section>

           <section className="bg-red-50 border-[3px] border-red-500 p-8 shadow-[8px_8px_0_0_rgba(239,68,68,0.2)]">
              <h3 className="font-bebas text-2xl uppercase text-red-600 mb-2">Danger Zone</h3>
              <p className="text-[10px] font-bold text-red-600/60 uppercase mb-6 leading-tight">These actions are permanent and cannot be undone.</p>
              
              <div className="space-y-3">
                <button 
                  onClick={logout}
                  className="w-full bg-white border-[2px] border-red-500 py-3 font-bebas text-xl text-red-600 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={18} /> LOG OUT
                </button>
                <button className="w-full bg-red-500 border-[2px] border-red-500 py-3 font-bebas text-xl text-white hover:bg-red-600 transition-all flex items-center justify-center gap-2">
                  <Trash2 size={18} /> DELETE ACCOUNT
                </button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
