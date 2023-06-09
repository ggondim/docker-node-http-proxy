FROM node:alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm ci --omit=dev

COPY ./ ./

EXPOSE 3080

CMD ["npm", "start"]