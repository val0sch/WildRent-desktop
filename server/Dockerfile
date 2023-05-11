FROM node:lts-alpine

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN mkdir app
WORKDIR /app

COPY package.json ./

COPY tsconfig.json ./

RUN npm install

COPY src src

CMD npm start