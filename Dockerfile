FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY package.json yarn.lock ./

RUN yarn install --only=development

COPY . .

RUN yarn build

FROM node:12.19.0-alpine3.9 as production

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]


# EXPOSE 3002

CMD ["nest", "start"]


# RUN npm install glob rimraf

# RUN npm install --only=development

# COPY . .

# RUN npm run build

# FROM node:12.19.0-alpine3.9 as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]
