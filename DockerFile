# Use official Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]
