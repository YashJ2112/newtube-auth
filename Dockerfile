FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

# RUN npm install glob rimraf

# RUN yarn

RUN yarn install --frozen-lockfile --only=development

# RUN npm install --only=development

COPY . .

RUN npm run build

RUN yarn prebuild && yarn build

FROM node:12.19.0-alpine3.9 as production

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

# RUN npm install --only=production

RUN yarn install --frozen-lockfile --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
# CMD [ "yarn", "start:dev" ]