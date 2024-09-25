# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN yarn build

# Install a lightweight web server and serve the built frontend
RUN npm install -g serve

# Expose the port for the frontend (assuming it's served on port 3000)
EXPOSE 3000

# Start the frontend with the 'serve' command
CMD ["serve", "-s", "build", "-l", "3000"]
