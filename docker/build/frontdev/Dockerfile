FROM ubuntu

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y curl

RUN cd /tmp && curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

RUN npm install babel webpack webpack-dev-server -g


RUN mkdir -p /opt/scripts
COPY ./start-dev-server.sh /opt/scripts

EXPOSE 7000