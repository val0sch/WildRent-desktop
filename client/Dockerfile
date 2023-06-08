FROM node:lts-alpine

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN mkdir app

WORKDIR /app

COPY public public
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
RUN npm install

COPY setup.js ./

COPY src src

CMD npm start