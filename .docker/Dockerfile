FROM node:14.17-alpine3.14 AS development

WORKDIR /usr/server

COPY package*.json .
COPY tsconfig.json .
COPY .env .
COPY src .

RUN npm install

CMD ["npm", "run", "dev"]
