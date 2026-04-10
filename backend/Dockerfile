FROM node:20-alpine

# Working directory inside the container
WORKDIR /app

# Copy files relative to the 'backend' directory
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]