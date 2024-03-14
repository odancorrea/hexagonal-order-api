FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

CMD ["npm", "start"]
