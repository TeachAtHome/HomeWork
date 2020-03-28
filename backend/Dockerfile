FROM node:13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY build .

CMD [ "node", "index.js", "8080", "mongo", "27017" ]