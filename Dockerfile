FROM node:9.2.0
RUN mkdir /building
COPY package.json /building
COPY package-lock.json /building
WORKDIR /building
RUN npm install
COPY . /building
EXPOSE 8000
CMD ["npm", "run", "app"]
