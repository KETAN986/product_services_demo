FROM node:14.15.4-alpine
WORKDIR /home/demo
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 6001
CMD ["npm","start"]
