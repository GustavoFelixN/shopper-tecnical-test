FROM node:23 as base
WORKDIR /app

# Copy package.json and prisma schema
COPY package.json ./
COPY prisma ./prisma

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy the rest of the code
COPY . .

FROM base as production
ENV NODE_PATH=./build
RUN npm run build