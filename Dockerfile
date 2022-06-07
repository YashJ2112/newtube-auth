FROM node:16-alpine AS development

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY package.json yarn.lock ./

RUN yarn install --only=development

COPY . .

RUN yarn build

FROM node:16-alpine as production

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

# EXPOSE 3002

# CMD ["nest", "start"]

CMD ["node", "dist/main"]