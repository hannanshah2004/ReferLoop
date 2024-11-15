# Use a specific version of Node.js that is compatible with Next.js
FROM node:18-alpine

# Set environment variables
ENV BUILD_STANDALONE=true

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app (static export is handled by the build command)
RUN npm run build

# Expose port 3000 (default Next.js port for serve)
EXPOSE 3000

# Command to run the Next.js app (use node instead of next start for standalone build)
CMD ["node", ".next/standalone/server.js"]
