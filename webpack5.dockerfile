FROM node:15.4

RUN mkdir /app
WORKDIR /app

ADD src/helper.js /app/index.js
ADD helper.webpack5.js /app/webpack.config.js
