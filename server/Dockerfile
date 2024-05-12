FROM node:20.10.0
 
WORKDIR /app

COPY ./server/package.json .
COPY ./server/tsconfig.json .

RUN npm install

COPY ./server/prisma ./prisma

RUN npx prisma generate

COPY . .

# CMD ["npm", "run", "start"]
