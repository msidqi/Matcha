FROM ubuntu:latest

WORKDIR app/
RUN apt-get update && apt-get -y install curl npm dirmngr apt-transport-https lsb-release ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
