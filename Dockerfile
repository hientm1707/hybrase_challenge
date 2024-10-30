# Use Node.js 18.4.0 as the base image
FROM node:18.4.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to the outside
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]