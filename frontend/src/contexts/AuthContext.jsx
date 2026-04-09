import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Sync with backend
        try {
          const response = await fetch('/api/auth/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: firebaseUser.uid,
              email: firebaseUser.email
            })
          });
          
          if (response.ok) {
            const backendUser = await response.json();
            setProfile(backendUser);
          } else {
            console.warn(`Backend sync failed with status: ${response.status}`);
          }
          setUser(firebaseUser);
        } catch (err) {
          console.error("Failed to sync user with backend:", err);
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const updateProfileSettings = async (settings) => {
    if (!user) return;
    try {
      const response = await fetch(`/api/auth/profile/${user.uid}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      console.error("Failed to update profile settings:", err);
      throw err;
    }
  };

  const value = {
    user,
    profile,
    loading,
    logout,
    updateProfileSettings
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
