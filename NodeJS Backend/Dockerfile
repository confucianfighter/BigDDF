FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install typescript -g
COPY . .
EXPOSE 5000
RUN chown -R root /usr/src/app
RUN node
USER root
CMD ["sleep", "infinity"]
#RUN npm start
#CMD ["npm", "start"]
