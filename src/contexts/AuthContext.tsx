import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  completeOnboarding: (interests: string[]) => void;
  addXP: (amount: number) => void;
  addCredits: (amount: number) => void;
  useCredits: (amount: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('gyaanmitra_user');
    const onboarded = localStorage.getItem('gyaanmitra_onboarded');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (onboarded) {
      setIsOnboarded(JSON.parse(onboarded));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('gyaanmitra_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gyaanmitra_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Demo credentials check
    if (email === 'student@gyaan.com' && password === 'password123') {
      const demoUser: User = {
        id: 'demo_user_123',
        name: 'Arjun Sharma',
        email: 'student@gyaan.com',
        avatar: '👨‍🎓',
        level: 5,
        xp: 2450,
        xpToNextLevel: 3000,
        class: 'Class 12',
        stream: 'Science Stream',
        interests: ['coding', 'physics', 'mathematics', 'design'],
        streak: 12,
        credits: 250,
        rating: 4.8,
        joinedDate: new Date('2024-06-15').toISOString(),
        badges: ['🏆', '🎯', '⚡', '🌟'],
        skills: ['React', 'Python', 'Mathematics', 'Physics'],
      };
      
      setUser(demoUser);
      setIsOnboarded(true);
      localStorage.setItem('gyaanmitra_onboarded', 'true');
      return;
    }
    
    // For any other credentials, create a new demo user
    const demoUser: User = {
      id: 'user_' + Date.now(),
      name: email.split('@')[0],
      email,
      avatar: '🎓',
      level: 1,
      xp: 0,
      xpToNextLevel: 500,
      class: 'Class 10',
      stream: 'General',
      interests: ['learning'],
      streak: 1,
      credits: 50,
      rating: 0,
      joinedDate: new Date().toISOString(),
      badges: [],
      skills: [],
    };
    
    setUser(demoUser);
    setIsOnboarded(true);
    localStorage.setItem('gyaanmitra_onboarded', 'true');
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: 'user_' + Date.now(),
      name,
      email,
      avatar: '🎓',
      level: 1,
      xp: 0,
      xpToNextLevel: 500,
      class: '',
      stream: '',
      interests: [],
      streak: 0,
      credits: 50, // Starting credits
      rating: 0,
      joinedDate: new Date().toISOString(),
      badges: [],
      skills: [],
    };
    
    setUser(newUser);
    setIsOnboarded(false);
  };

  const loginWithGoogle = async () => {
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const googleUser: User = {
      id: 'user_google_' + Date.now(),
      name: 'Google User',
      email: 'user@gmail.com',
      avatar: '👨‍🎓',
      level: 1,
      xp: 0,
      xpToNextLevel: 500,
      class: '',
      stream: '',
      interests: [],
      streak: 0,
      credits: 50,
      rating: 0,
      joinedDate: new Date().toISOString(),
      badges: [],
      skills: [],
    };
    
    setUser(googleUser);
    setIsOnboarded(false);
  };

  const logout = () => {
    setUser(null);
    setIsOnboarded(false);
    localStorage.removeItem('gyaanmitra_user');
    localStorage.removeItem('gyaanmitra_onboarded');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const completeOnboarding = (interests: string[]) => {
    if (user) {
      updateUser({ interests });
      setIsOnboarded(true);
      localStorage.setItem('gyaanmitra_onboarded', 'true');
    }
  };

  const addXP = (amount: number) => {
    if (!user) return;
    
    let newXP = user.xp + amount;
    let newLevel = user.level;
    let xpToNext = user.xpToNextLevel;
    
    // Check for level up
    while (newXP >= xpToNext) {
      newXP -= xpToNext;
      newLevel++;
      xpToNext = calculateXPForNextLevel(newLevel);
    }
    
    updateUser({
      xp: newXP,
      level: newLevel,
      xpToNextLevel: xpToNext,
    });
  };

  const addCredits = (amount: number) => {
    if (!user) return;
    updateUser({ credits: user.credits + amount });
  };

  const useCredits = (amount: number): boolean => {
    if (!user || user.credits < amount) return false;
    updateUser({ credits: user.credits - amount });
    return true;
  };

  const calculateXPForNextLevel = (level: number): number => {
    // Progressive XP requirement: 500 * level^1.5
    return Math.floor(500 * Math.pow(level, 1.5));
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isOnboarded,
    login,
    signup,
    loginWithGoogle,
    logout,
    updateUser,
    completeOnboarding,
    addXP,
    addCredits,
    useCredits,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
