FROM node:18.15.0-alpine

WORKDIR /app
EXPOSE 3000
ENV CI=true