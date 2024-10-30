FROM node:22.9.0-alpine

WORKDIR /opt/

COPY package.json /opt/

RUN npm install

COPY . .

RUN npm test

EXPOSE 3000

CMD ["npm", "run", "start"]