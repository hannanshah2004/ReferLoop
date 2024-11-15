# Use a specific version of Node.js that is compatible with your Next.js version
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the necessary files from the builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/required-server-files.json ./.next/required-server-files.json

# Install only production dependencies
RUN npm ci --only=production

# Expose port 3000
EXPOSE 3000

# Set environment variables (if needed)
# ENV NODE_ENV=production

# Command to run the Next.js app
CMD ["node", "server.js"]
