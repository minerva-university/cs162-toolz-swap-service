FROM node:14.16.0-alpine 
WORKDIR /app/app_front
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]