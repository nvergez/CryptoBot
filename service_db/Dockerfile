FROM node:latest

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9002
CMD "npm" "run" "nodemon"