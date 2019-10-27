FROM ubuntu:latest

WORKDIR app/

RUN apt-get update && apt-get upgrade && apt-get -y install software-properties-common \
                                                            curl wget npm vim dirmngr \
                                                            apt-transport-https lsb-release \
                                                            ca-certificates default-jdk                           
RUN wget -O - http://debian.neo4j.org/neotechnology.gpg.key | apt-key add -
RUN echo 'deb http://debian.neo4j.org/repo stable/' > /etc/apt/sources.list.d/neo4j.list
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

RUN apt-get install -y nodejs neo4j && npm install -g nodemon && npm install neo4j-driver express --save

## Start server
#CMD nodemon nodeapp/app.js
#nodemon start -L app.js
#pm2 start --watch . --name=my-process app.js