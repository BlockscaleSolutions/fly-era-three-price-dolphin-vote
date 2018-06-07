FROM ubuntu:artful

MAINTAINER Adam Lemmon <adam@blockscalesolutions.com>

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y curl

# update node to latest
RUN npm cache clean -f
RUN npm install -g n
RUN n 9.3.0

RUN npm install -g yarn

# Create app directory
COPY . /usr/src/controller
WORKDIR /usr/src/controller

# Install app dependencies
RUN yarn

CMD ["yarn", "start"]
EXPOSE 3001
