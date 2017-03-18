FROM node
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev
RUN mkdir /kibbl
WORKDIR /kibbl
ADD package.json /kibbl/package.json
RUN npm install

EXPOSE 3000

ADD . /kibbl