FROM node:16.14.0

RUN npm i -g @nestjs/cli

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3002

CMD ["nest", "start"]
