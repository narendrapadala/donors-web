### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

RUN #!/bin/sh
RUN apk add --update git

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

#RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
ARG ENV=stage

## Build the angular app in production mode and store the artifacts in dist folder
#RUN npm run ng build --prod --configuration=$ENV --output-path=dist
#RUN npm run ng build -- --aot --buildOptimizer --output-path=dist
RUN npm run ng build -- --aot --buildOptimizer --output-path=dist


### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/


 ##RUN rm /etc/nginx/nginx.conf
  
 ##COPY nginx/nginx.conf /etc/nginx/nginx.conf


## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]