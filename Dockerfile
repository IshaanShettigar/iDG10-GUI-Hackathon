FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --production

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]
