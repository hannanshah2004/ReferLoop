// lib/auth0-config.js

export const auth0Config = {
    clientId: process.env.AUTH0_CLIENT_ID,  // Your Auth0 Client ID
    clientSecret: process.env.AUTH0_CLIENT_SECRET,  // Your Auth0 Client Secret
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,  // Your Auth0 Issuer URL
    baseURL: process.env.AUTH0_BASE_URL,  // Your Next.js App URL
    secret: process.env.AUTH0_SECRET,  // A random string used to sign the session cookie
    routes: {
      callback: '/api/auth/callback',
      logout: '/api/auth/logout',
    },
  };
  