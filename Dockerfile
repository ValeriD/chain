# build stage
FROM node:16.13.0 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps --loglevel=error
COPY . .
RUN npm run build --loglevel=error
# # production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]