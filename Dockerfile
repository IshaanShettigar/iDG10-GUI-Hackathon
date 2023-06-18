FROM node:18-alpine

WORKDIR /usr/src/app

COPY . ./

RUN npm install

CMD ["npx", "http-server", "-p", "8080", "./main"]
