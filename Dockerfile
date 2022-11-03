FROM node:alpine

WORKDIR /hotel-api-nestjs

RUN npm install \
    npx prisma migrate \
    npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]