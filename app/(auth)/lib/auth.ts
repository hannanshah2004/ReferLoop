import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from './firebase';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation'; // Use next/navigation for routing

// Google login function
export const googleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
    console.log('User logged in with Google');
    // Redirect the user after successful login
    window.location.href = '/how-referloop-works';  // Or use router.push('/') for client-side navigation
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Google login error: ', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
};

// Sign out function
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
    // Redirect the user after logout
    window.location.href = '/';  // Or use router.push('/') for client-side navigation
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Logout error: ', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
};
