FROM --platform=linux/amd64 node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

CMD ["npm", "start"]

EXPOSE 80