FROM node:18-alpine

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN mkdir app

WORKDIR /app

COPY public public
COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY setup.js ./
COPY tailwind.config.js ./

COPY src src

CMD npm start