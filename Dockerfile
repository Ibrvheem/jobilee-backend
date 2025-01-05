FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY protos ./protos/
COPY tsconfig.build.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/protos ./protos/
COPY --from=builder /app/tsconfig.build.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/prisma ./prisma/
EXPOSE 9308
CMD ["npm", "run", "start:prod"]