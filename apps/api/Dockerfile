FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

FROM node:alpine AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
RUN npm install -g @nestjs/cli

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
