import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ResearchHub from './components/ResearchHub';
import MarketSegments from './components/MarketSegments';
import Dashboard from './components/Dashboard';
import FAB from './components/FAB';
import WatchlistDrawer from './components/WatchlistDrawer';
import { NotificationProvider } from './components/NotificationProvider';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
import SettingsModal from './components/SettingsModal';
import LandingPage from './components/LandingPage';
import UnifiedAuthPage from './components/UnifiedAuthPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center font-bebas text-4xl">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}


import DashboardLayout from './components/DashboardLayout';
import MainDashboard from './components/MainDashboard';
import ResearchPage from './components/ResearchPage';
import WatchlistPage from './components/WatchlistPage';
import MarketPage from './components/MarketPage';
import AlertsPage from './components/AlertsPage';
import SettingsPage from './components/SettingsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<UnifiedAuthPage mode="login" />} />
            <Route path="/signup" element={<UnifiedAuthPage mode="signup" />} />
            
            {/* Authenticated Dashboard Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardLayout>
                  <MainDashboard />
                </DashboardLayout>
              </PrivateRoute>
            } />

            <Route path="/dashboard/research" element={
              <PrivateRoute>
                <DashboardLayout>
                  <ResearchPage />
                </DashboardLayout>
              </PrivateRoute>
            } />

            <Route path="/dashboard/watchlist" element={
              <PrivateRoute>
                <DashboardLayout>
                  <WatchlistPage />
                </DashboardLayout>
              </PrivateRoute>
            } />

            <Route path="/dashboard/markets" element={
              <PrivateRoute>
                <DashboardLayout>
                  <MarketPage />
                </DashboardLayout>
              </PrivateRoute>
            } />

            <Route path="/dashboard/alerts" element={
              <PrivateRoute>
                <DashboardLayout>
                  <AlertsPage />
                </DashboardLayout>
              </PrivateRoute>
            } />

            <Route path="/settings" element={
              <PrivateRoute>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </PrivateRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
