FROM node:20
WORKDIR /
COPY . .
RUN npm install
EXPOSE 3002
CMD ["node", "index.js"]