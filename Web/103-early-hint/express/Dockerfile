# Use the official Node.js 20 image as the base image
FROM node:20

# Create and change to the app directory
WORKDIR /app

# Copy application code
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "index.js"]
