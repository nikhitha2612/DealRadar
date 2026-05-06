import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#FDFCF0] overflow-x-hidden">
      {/* Sidebar - Mobile Toggle Controlled */}
      <SideNavbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 min-w-0 transition-all duration-300 relative overflow-x-hidden">
        {/* Decorative Background Elements */}
        <div className="fixed top-20 right-20 w-96 h-96 bg-[var(--neo-pink)]/5 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="fixed bottom-20 left-80 w-80 h-80 bg-[var(--neo-green)]/10 rounded-full blur-[80px] -z-10" />
        
        {/* Header Content Wrapper for Padding */}
        <div className="p-3 md:p-8">
          <Header 
            onOpenSettings={() => navigate('/settings')} 
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          {/* Content Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
