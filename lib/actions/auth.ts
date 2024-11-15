import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from './firebase';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation'; // Use next/navigation for routing

// Google login function
export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('User logged in with Google');
    
    // The signed-in user info.
    const user = result.user;
    // Redirect the user after successful login
    window.location.href = '/rewards';  // Or use router.push('/') for client-side navigation
    return user
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

