FROM ubuntu:latest

WORKDIR app/

RUN apt-get update && apt-get upgrade -y && apt-get -y install software-properties-common \
                                                            curl wget npm vim dirmngr \
                                                            apt-transport-https lsb-release \
                                                            ca-certificates 
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

RUN apt-get update && apt-get install -y nodejs \
			&& npm install -g nodemon \
			&& npm install neo4j-driver express body-parser --save
## Start server
CMD nodemon -L --use_strict nodeapp/app.js > logs/nodejs.log 2>&1
#pm2 start --watch . --name=my-process app.js
