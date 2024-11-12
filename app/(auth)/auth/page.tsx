'use client'  // Ensures this component is treated as a client-side component

import { useUser } from '@auth0/nextjs-auth0/client';  // Correct import path for useUser
import Button from '@/components/Button';  // Corrected import for default export

const AuthPage = () => {
  const { user, error, isLoading } = useUser();  // Access user data from Auth0

  if (isLoading) {
    return <div>Loading...</div>;  // Handle loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // Handle error state
  }

  return (
    <div className="container">
      {!user ? (
        // If the user is not logged in, show the Sign Up / Login button
        <div>
          <h2>Welcome to the Auth Page</h2>
          <Button 
            type="button" 
            title="Log In / Sign Up"
            icon="/user.svg"
            variant="btn_dark_green"
            onClick={() => window.location.href = '/api/auth/login'}  // Redirect to Auth0 login route
          />
        </div>
      ) : (
        // If the user is logged in, display their profile info
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <img src={user.picture ?? '/default-profile.png'} alt="User Profile" />
          <Button 
            type="button" 
            title="Log Out"
            variant="btn_dark_green"
            onClick={() => window.location.href = '/api/auth/logout'}  // Redirect to Auth0 logout route
          />
        </div>
      )}
    </div>
  );
};

export default AuthPage;
