# Stage 1 - Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2 - Run
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app ./

EXPOSE 1337
CMD ["npm", "run", "start"]
