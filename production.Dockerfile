FROM node:lts-bullseye
LABEL Edilson Pereira da Silva
COPY . /var/www
WORKDIR /var/www
RUN npm install -g npm@8.3.0
EXPOSE 3000

