FROM node:18.17.0-slim
EXPOSE 3000
WORKDIR /home/node/app
COPY ./dist .
COPY package.json .
RUN npm install --omit=dev
CMD [ "npm", "run", "prod" ]
