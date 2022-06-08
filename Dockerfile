FROM node:14-alpine3.16

WORKDIR /app

COPY . /app

RUN npm install

RUN addgroup www; \
    adduser -D -G www nodeusr; \
    chown -R :www /app;

USER nodeusr

CMD ["npm", "start"]