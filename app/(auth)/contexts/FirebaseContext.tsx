'use client';  // Ensures this component is treated as a client-side component

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, provider } from '../../../lib/actions/firebase';  // Import provider from firebase
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';  // Use next/navigation for routing

interface FirebaseContextType {
  user: any;
  googleLogin: () => void;  // Add googleLogin to context
  logout: () => void;
  loading: boolean;
  error: string | null;
}

export const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  googleLogin: () => {},  // googleLogin function placeholder
  logout: () => {},
  loading: false,
  error: null,
});

interface FirebaseProviderProps {
  children: ReactNode;  // Define the children prop type as ReactNode
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);  // New state for success message
  const router = useRouter();  // Use the correct hook for Next.js routing

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Google login function
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log('User logged in with Google');  // Log to console
      setTimeout(() => {
        router.push('/how-referloop-works');  // Redirect after 3 seconds
      }, 3000);
    } catch (err) {
      setError('Failed to login with Google');
      console.error(err);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');  // Log to console
      setSuccessMessage('Success! You are logged out.');
      console.log('Logout successful');  // Additional log in the console for success
      // Optionally, you can redirect after showing the success message
      setTimeout(() => {
        router.push('/how-referloop-works');  // Redirect after 3 seconds
      }, 3000);
    } catch (err) {
      setError('Failed to log out');
      console.error(err);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, googleLogin, logout, loading, error }}>
      {children}
      {successMessage && <div>{successMessage}</div>}  {/* Display success message */}
    </FirebaseContext.Provider>
  );
};
