# Cannot run alpine or slim on M1 Mac
FROM node:16.4-buster

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
