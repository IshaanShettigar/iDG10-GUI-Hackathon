FROM node:18-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["npx", "http-server", "-p", "8080", "./main/"]
