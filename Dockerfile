FROM node:alpine AS assets

WORKDIR /app
COPY . /app 
RUN npm install



