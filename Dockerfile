#define the latest nodejs image  to build from
FROM node:14.4.0
#create a working directory
WORKDIR /usr/src/notes-app/notes-server
#copy package.json file under the working directory 
COPY package.json /usr/src/notes-app/notes-server
# install all the dependencies 
RUN yarn install
RUN yarn global add pm2
#copy all your files under the working directory
COPY . /usr/src/notes-app/notes-server
#expose the port 4000
EXPOSE 5000
#start nodejs server 
CMD pm2-runtime start yarn --interpreter bash -- start
