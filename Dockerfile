FROM ubuntu:latest

WORKDIR app/
RUN add-apt-repository ppa:webupd8team/java

RUN apt-get update && apt-get -y install curl npm vim dirmngr apt-transport-https lsb-release ca-certificates oracle-java8-installer
RUN wget -O - http://debian.neo4j.org/neotechnology.gpg.key | apt-key add -
RUN echo 'deb http://debian.neo4j.org/repo stable/' > /etc/apt/sources.list.d/neo4j.list
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

## Install nodejs, packages and database (Default port : 7687 pass : neo4j)
RUN apt-get install -y nodejs neo4j && npm install nodemon -g && npm install neo4j-driver express --save

## Start server
#CMD nodemon nodeapp/app.js
