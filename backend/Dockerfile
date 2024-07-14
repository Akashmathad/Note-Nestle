FROM node:lts-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

USER node

EXPOSE 3000

CMD ["node", "server.js"]
