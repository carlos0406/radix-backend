FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY prisma ./prisma

COPY . .

RUN pnpm install

RUN pnpm exec prisma generate


EXPOSE 3000

CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm tsx seed.ts && pnpm dev"]