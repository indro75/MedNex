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

const DEFAULT_USER: UserProfile = {
  id: 'usr_khulna_01',
  name: 'Rahim Ahmed',
  email: 'rahim.ahmed@example.com',
  phone: '+880 1712 345678',
  age: 38,
  gender: 'male',
  bloodGroup: 'B+',
  emergencyContact: {
    name: 'Farzana Ahmed',
    relationship: 'Spouse',
    phone: '+880 1711 987654'
  },
  allergies: ['Penicillin', 'Dust mites'],
  chronicConditions: ['Mild Hypertension', 'Allergic Rhinitis'],
  city: 'Khulna'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('mednex_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER; // Default logged in for smooth developer/user preview
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('mednex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mednex_user');
    }
  }, [user]);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    // Simulated authentication
    const loggedUser: UserProfile = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: email.includes('@') ? email.split('@')[0].replace('.', ' ') : DEFAULT_USER.name
    };
    setUser(loggedUser);
    return true;
  };

  const signup = async (userData: Partial<UserProfile>): Promise<boolean> => {
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      id: `usr_${Date.now()}`,
      name: userData.name || 'New Patient',
      email: userData.email || 'patient@example.com',
      age: userData.age || 30,
      bloodGroup: userData.bloodGroup || 'O+',
      phone: userData.phone || '+880 1700 000000',
      ...userData
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updated });
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

