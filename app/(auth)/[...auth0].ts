// app/api/auth/[...auth0].ts

import { handleAuth } from '@auth0/nextjs-auth0';  // Import Auth0 handler

// Handle authentication routes (login, logout, callback)
export const handler = handleAuth();
export default handler;
