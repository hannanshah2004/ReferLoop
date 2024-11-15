# Use a specific version of Node.js that is compatible with Next.js
FROM node:18-alpine

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DOCKER_BUILD=True

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app (static export)
RUN npm run build && npm run export

# Expose port 3000 (default Next.js port for serve)
EXPOSE 3000

# Command to serve the static Next.js app
CMD ["npx", "serve@latest", "out"]
