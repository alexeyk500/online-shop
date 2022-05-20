FROM node

WORKDIR /server
RUN mkdir -p /server/static

COPY package*.json ./

RUN npm install

COPY . .

RUN npm uninstall bcrypt
RUN npm install bcrypt

ENV PORT=5000

EXPOSE 5000

CMD ["node", "index.js"]

