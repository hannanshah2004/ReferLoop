'use client';  // Ensures this component is treated as a client-side component

import React from 'react';
import { googleLogin } from '../lib/auth';  // Ensure correct import of googleLogin
import Button from '@/components/Button';  // Assuming the Button component is correct

const AuthPage = () => {

  return (
    <div className="container">
      <h2>Login with Google</h2>

      {/* Google login button */}
      <Button 
        type="button" 
        title="Log in with Google"
        onClick={googleLogin}  // Call googleLogin when clicked
        variant="btn_dark_green"
      />
    </div>
  );
};

export default AuthPage;
