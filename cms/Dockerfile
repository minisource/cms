# Stage 1 - Build
FROM node:22-alpine AS build
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git
WORKDIR /opt/app

COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npm run build

# Stage 2 - Run
FROM node:22-alpine
RUN apk add --no-cache vips-dev
WORKDIR /opt/app

COPY --from=build /opt/app ./

ENV PATH=/opt/app/node_modules/.bin:$PATH
EXPOSE 1337
CMD ["npm", "run", "start"]
