FROM node:lts-alpine3.20

ENV NEXT_PUBLIC_URL=https://note-nestle-backend.campushub.tech

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "start"]
