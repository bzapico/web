#
# Copyright (C) 2018 Nalej Group - All Rights Reserved
#

# Inspired by https://medium.com/@avatsaev/create-efficient-angular-docker-images-with-multi-stage-builds-907e2be3008d

### STAGE 1: Build the dist ###

FROM node:10.17.0-alpine as builder
COPY package.json package-lock.json ./

RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app
RUN ls ./ng-app
WORKDIR /ng-app

COPY *.json ./
COPY src/ src/.

RUN $(npm bin)/ng build

### STAGE 2: Setup ###

FROM nginx:1.15.6-alpine

COPY components/web/nginx/nalej_web.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
