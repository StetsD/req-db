FROM node:9.2.0
RUN mkdir /building
COPY package.json /building
WORKDIR /building
RUN npm install
COPY . /building
EXPOSE 3000
CMD ["npm", "run", "dev:server"]
