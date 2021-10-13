FROM node:14.15.4-alpine
WORKDIR /home/projects/template
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000
CMD ["npm","start"]