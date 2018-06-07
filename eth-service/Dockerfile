FROM node:carbon

MAINTAINER Adam Lemmon <adam@blockscalesolutions.com>

RUN apt-get update
RUN apt-get install -y lsof

RUN npm install -g yarn

# Create app directory
COPY . /usr/src/eth-service
WORKDIR /usr/src/eth-service

# Install app dependencies
RUN yarn

CMD ["yarn", "start"]
EXPOSE 3002
