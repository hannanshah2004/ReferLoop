# Use a specific version of Node.js that is compatible with Next.js
FROM node:18-alpine

# Set the working directory for your application
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that Next.js runs on (default: 3000)
EXPOSE 3000

# Set the command to start the Next.js app
CMD ["npm", "start"]
