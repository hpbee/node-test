FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN npm run start

EXPOSE 3500
CMD ["node", "build/index.js"]
