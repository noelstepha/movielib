FROM node:14-alpine

# create destination directory
RUN mkdir -p /usr/src/movielib-app
WORKDIR /usr/src/movielib-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/movielib-app/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 3000 on container
EXPOSE 3000

# start the app
CMD [ "npm", "start" ]
