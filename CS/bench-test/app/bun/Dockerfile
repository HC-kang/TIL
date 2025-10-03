FROM oven/bun:1.1-alpine
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN bun install --frozen-lockfile

COPY index.ts ./

EXPOSE 3000

ENV NODE_ENV=production
CMD ["bun", "run", "index.ts"]
