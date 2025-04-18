# Stage 1: Build the React app
FROM node:22-alpine AS build
WORKDIR /frontend

# Leverage caching by installing dependencies first
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code and build for production
COPY . ./
RUN npm run build

# Stage 2: Development environment
FROM node:22-alpine AS development
WORKDIR /frontend

# Install dependencies again for development
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the full source code
COPY --from=build /frontend/build ./build

# Expose port for the development server
EXPOSE 3000
CMD ["npm", "start"]
