FROM mhart/alpine-node:6.10.0

WORKDIR /app

RUN npm install -g babel-cli
RUN npm install -g nodemon
RUN npm install -g npm-run-all

COPY package.json /app/package.json
RUN npm install
RUN mv /app/node_modules /node_modules

#COPY . /app

CMD ["npm","run","serve:dev"]