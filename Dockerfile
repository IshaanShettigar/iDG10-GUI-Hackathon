FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app/main

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

WORKDIR /usr/src/app

COPY . .

CMD ["npx", "http-server", "-p", "8080", "./main/"]
