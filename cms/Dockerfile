# Stage 1 - Build
FROM node:18-alpine AS build

WORKDIR /app

# install dependency
COPY package*.json ./
RUN npm install

COPY . .

# build
RUN npm run build

# Stage 2 - Run
FROM node:18-alpine

WORKDIR /app

# copy build and node_modules
COPY --from=build /app ./

EXPOSE 1337

CMD ["npm", "run", "start"]
