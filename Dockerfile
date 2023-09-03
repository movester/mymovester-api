FROM node:18.17.1-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install && npm run build

CMD [ "node", "dist/main.js" ]