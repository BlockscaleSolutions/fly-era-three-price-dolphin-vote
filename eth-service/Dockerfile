FROM node:carbon

MAINTAINER Adam Lemmon <adam@blockscalesolutions.com>

RUN npm install -g yarn

# Create app directory
COPY . /usr/src/db-service
WORKDIR /usr/src/db-service

# Install app dependencies
RUN yarn

CMD ["yarn", "start"]
EXPOSE 3000
