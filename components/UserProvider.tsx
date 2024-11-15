'use client'

import { getLoggedInUser } from '@/lib/actions/user.actions';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  email: string;
  userId: string
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getLoggedInUser().then(userData => setUser(userData))

    console.log()
    // Here you would typically check for a stored auth token and fetch user data
    // For example:
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   fetchUserData(token).then(userData => setUser(userData));
    // }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};