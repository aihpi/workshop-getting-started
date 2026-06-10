FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Backend URL for the Vite dev server (browser reads import.meta.env.VITE_BACKEND_URL)
ENV VITE_BACKEND_URL=http://localhost:8000

# Vite dev server (host:true in vite.config.js binds 0.0.0.0)
EXPOSE 3000

CMD ["npm", "run", "dev"]
