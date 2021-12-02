FROM node:10-alpine as build-step
WORKDIR /app/app_front
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
# Stage 2\
FROM nginx:1.17.1-alpine
COPY --from=build-step ./build /usr/share/nginx/html
EXPOSE 3000