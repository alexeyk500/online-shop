FROM node

RUN mkdir -p /server/static

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD ["node", "index.js"]

