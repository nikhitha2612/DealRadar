import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SettingsModal = ({ isOpen, onClose }) => {
  const { profile, updateProfileSettings } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(profile?.notification_settings || { email: true, browser: true });

  if (!isOpen) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfileSettings({ notification_settings: settings });
      onClose();
    } catch (err) {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white border-[4px] border-[var(--neo-border)] p-10 shadow-[12px_12px_0_0_var(--neo-shadow)] animate-in zoom-in-95 duration-300">
        <h2 className="text-4xl font-bebas text-[#1A1A1A] mb-8 text-center tracking-tight">System Preferences</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-widest mb-4">Notification Channels</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-slate-50 border-[2px] border-[var(--neo-border)] cursor-pointer hover:bg-[var(--neo-yellow)] transition-all shadow-[4px_4px_0_0_var(--neo-shadow)] active:shadow-none translate-x-0 active:translate-x-1 active:translate-y-1">
                <div className="flex flex-col">
                  <span className="text-[#1A1A1A] font-bebas text-2xl tracking-tight">Email Alerts</span>
                  <span className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase">Instant target hit notifications</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.email}
                  onChange={e => setSettings({...settings, email: e.target.checked})}
                  className="w-8 h-8 border-[3px] border-[var(--neo-border)] bg-white text-[var(--neo-green)] focus:ring-0 transition-all cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between p-4 bg-slate-50 border-[2px] border-[var(--neo-border)] cursor-pointer hover:bg-[var(--neo-pink)] transition-all shadow-[4px_4px_0_0_var(--neo-shadow)] active:shadow-none translate-x-0 active:translate-x-1 active:translate-y-1">
                <div className="flex flex-col">
                  <span className="text-[#1A1A1A] font-bebas text-2xl tracking-tight">Desktop Alerts</span>
                  <span className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase">Browser push notifications</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.browser}
                  onChange={e => setSettings({...settings, browser: e.target.checked})}
                  className="w-8 h-8 border-[3px] border-[var(--neo-border)] bg-white text-[var(--neo-green)] focus:ring-0 transition-all cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="pt-8 border-t-[2px] border-[#1A1A1A]/10 flex gap-6">
            <button 
              onClick={onClose}
              className="flex-1 py-4 border-[3px] border-[var(--neo-border)] bg-white text-[#1A1A1A] font-bebas text-2xl hover:bg-slate-100 transition-colors shadow-[4px_4px_0_0_var(--neo-shadow)] active:shadow-none"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="flex-1 py-4 border-[3px] border-[var(--neo-border)] bg-[var(--neo-green)] text-[#1A1A1A] font-bebas text-2xl hover:bg-[var(--neo-yellow)] transition-all shadow-[4px_4px_0_0_var(--neo-shadow)] active:shadow-none"
            >
              {loading ? 'Processing...' : 'Update Sync'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
