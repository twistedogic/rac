FROM google/nodejs:latest
MAINTAINER Jordan Li
VOLUME /data
WORKDIR /app
ADD . /app
RUN npm install