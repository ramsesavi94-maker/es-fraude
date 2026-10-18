FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production PORT=8787
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY public ./public
COPY tsconfig.json ./
EXPOSE 8787
USER node
CMD ["npx", "tsx", "src/server.ts"]
