FROM node:8

# Create app directory
WORKDIR /usr/src/app

RUN mkdir -p /var/www
RUN mkdir -p /opt/app/images
RUN mkdir -p /opt/app/logs

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
#ADD . .

EXPOSE 3000

CMD [ "nodemon", "." ]