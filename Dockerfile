FROM node:16.14.0-alpine  as build

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . . 
RUN npm install -g @angular/cli
RUN ng build 




FROM nginx:1.17-alpine
##VOLUME nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/front-model /usr/share/nginx/html
