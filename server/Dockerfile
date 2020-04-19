FROM node:alpine
# Create app directory
WORKDIR /usr/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .
RUN npm install
# If you are building your code for production
# RUN npm ci --only=produion
# Bundle app source

CMD ["npm","run", "serve"]