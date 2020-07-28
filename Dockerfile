FROM node:12
# Create app directory

WORKDIR /usr/src/app
# Install app dependencies
COPY ./src/package*.json ./
RUN npm install
# Copy app source code
COPY ./src/. .
#Expose port and start application
EXPOSE $PORT
CMD [ "npm", "start" ]
