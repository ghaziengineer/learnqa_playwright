# Use the official Playwright image with browsers
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

# Set working directory
WORKDIR /app

# Copy package config
COPY package.json .

# Install dependencies (Playwright and others)
RUN npm install

# Copy the rest of the project
COPY . .

# By default run your tests
CMD ["npm", "run", "test"]