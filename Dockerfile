FROM node:16-alpine

# Définir les variables d'environnement
ENV NODE_ENV=production
ENV PORT=8081

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application code
COPY . .

# Create src directory if it doesn't exist
RUN mkdir -p src

# Expose the correct port
EXPOSE 8081

# Start the application
CMD ["node", "src/index.js"]