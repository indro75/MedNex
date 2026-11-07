import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (userData: Partial<UserProfile>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('mednex_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null; // Start unauthenticated unless user previously signed up or logged in
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('mednex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mednex_user');
    }
  }, [user]);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    if (!email) return false;

    // Check previously registered users in local storage
    const stored = localStorage.getItem('mednex_registered_users');
    let usersList: UserProfile[] = [];
    if (stored) {
      try {
        usersList = JSON.parse(stored);
      } catch {
        usersList = [];
      }
    }

    const matched = usersList.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (matched) {
      setUser(matched);
      return true;
    }

    // Authenticate and construct user profile from credentials
    const cleanName = email.split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const authenticatedUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: cleanName || 'Patient',
      email: email.trim(),
      phone: '+880 1700 000000',
      age: 30,
      gender: 'male',
      bloodGroup: 'B+',
      city: 'Khulna',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      },
      allergies: [],
      chronicConditions: []
    };

    // Save to user store
    usersList = [authenticatedUser, ...usersList.filter((u) => u.email !== authenticatedUser.email)];
    localStorage.setItem('mednex_registered_users', JSON.stringify(usersList));

    setUser(authenticatedUser);
    return true;
  };

  const signup = async (userData: Partial<UserProfile>): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: userData.name?.trim() || 'New Patient',
      email: userData.email?.trim() || 'patient@mednex.org',
      age: userData.age || 28,
      gender: userData.gender || 'male',
      bloodGroup: userData.bloodGroup || 'A+',
      phone: userData.phone || '+880 1700 000000',
      city: userData.city || 'Khulna',
      emergencyContact: userData.emergencyContact || {
        name: '',
        relationship: '',
        phone: ''
      },
      allergies: userData.allergies || [],
      chronicConditions: userData.chronicConditions || []
    };

    // Save to user registry
    const stored = localStorage.getItem('mednex_registered_users');
    let usersList: UserProfile[] = [];
    if (stored) {
      try {
        usersList = JSON.parse(stored);
      } catch {
        usersList = [];
      }
    }

    usersList = [newUser, ...usersList.filter((u) => u.email !== newUser.email)];
    localStorage.setItem('mednex_registered_users', JSON.stringify(usersList));

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mednex_user');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      const merged = { ...user, ...updated };
      setUser(merged);
      // Also update in registered list
      const stored = localStorage.getItem('mednex_registered_users');
      if (stored) {
        try {
          const list: UserProfile[] = JSON.parse(stored);
          const updatedList = list.map((u) => (u.email === user.email ? merged : u));
          localStorage.setItem('mednex_registered_users', JSON.stringify(updatedList));
        } catch {}
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
