import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Toast from './Toast';
import { useAuth } from '../contexts/AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, duration);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  useEffect(() => {
    let timerId;
    let failCount = 0;

    const pollNotifications = async () => {
      if (!user) return;
      try {
        const response = await fetch(`/api/notifications?user_id=${user.uid}`);
        if (!response.ok) {
          failCount++;
          return;
        }
        
        failCount = 0; // Reset on success
        const data = await response.json();
        
        if (data && data.length > 0) {
          const idsToMark = [];
          data.forEach(n => {
            addNotification(n.message, n.type || 'target', 8000);
            idsToMark.push(n.id);
          });
          
          if (idsToMark.length > 0) {
            await fetch(`/api/notifications/mark-read?user_id=${user.uid}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(idsToMark)
            });
          }
        }
      } catch (err) {
        failCount++;
        // If we fail too many times, we'll wait longer (backoff handled by scheduleNext)
      } finally {
        // Schedule next poll with backoff
        scheduleNext();
      }
    };

    const scheduleNext = () => {
      // Base wait is 5s, adds up to 30s if multiple failures occur
      const waitTime = Math.min(5000 + (failCount * 5000), 30000);
      timerId = setTimeout(pollNotifications, waitTime);
    };

    // Initial fetch
    pollNotifications();
    
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [addNotification, user]);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-24 right-8 z-[200] space-y-4 pointer-events-none">
        {notifications.map(n => (
          <Toast 
            key={n.id} 
            message={n.message} 
            type={n.type} 
            onClose={() => removeNotification(n.id)} 
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
