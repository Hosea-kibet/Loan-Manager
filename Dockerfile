# Build stage
FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build        # compiles TypeScript to dist/
RUN npx prisma generate  # generates Prisma client

# Production image
FROM node:20 as prod

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma     
COPY .env .env                              

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
