import React from 'react';
import { CheckCircle2, AlertCircle, Info, Bell, X } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  const icons = {
    trigger: <Bell className="text-indigo-400" size={20} />,
    success: <CheckCircle2 className="text-emerald-400" size={20} />,
    error: <AlertCircle className="text-red-400" size={20} />,
    target: <CheckCircle2 className="text-emerald-400 animate-bounce" size={24} />,
    info: <Info className="text-blue-400" size={20} />
  };

  const bgStyles = {
    trigger: 'bg-white dark:bg-slate-900/90 border-indigo-500/30',
    success: 'bg-white dark:bg-slate-900/90 border-emerald-500/30',
    error: 'bg-white dark:bg-slate-900/90 border-red-500/30',
    target: 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]',
    info: 'bg-white dark:bg-slate-900/90 border-blue-500/30'
  };

  return (
    <div 
      className={`pointer-events-auto flex items-center gap-4 p-4 pr-6 rounded-[2rem] border backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-full fade-in duration-500 ${bgStyles[type] || bgStyles.info}`}
    >
      <div className={`p-2 rounded-2xl ${type === 'target' ? 'bg-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800/50'}`}>
        {icons[type] || icons.info}
      </div>
      
      <div className="flex-1 min-w-[200px]">
        {type === 'target' && (
          <p className="text-[10px] font-black text-emerald-400 tracking-widest uppercase mb-0.5">Price Objective Hit</p>
        )}
        <p className={`text-sm font-bold ${type === 'target' ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'} leading-tight`}>
          {message}
        </p>
      </div>

      <button onClick={onClose} className="text-slate-500 hover:text-slate-900 dark:text-white transition-colors">
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
