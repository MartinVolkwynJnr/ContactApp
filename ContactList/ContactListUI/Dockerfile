# base image
FROM node:latest

ENV PORT=3000

COPY    . /ContactListUI
WORKDIR /ContactListUI
RUN     npm install

EXPOSE $PORT

ENTRYPOINT [ "npm", "start" ]