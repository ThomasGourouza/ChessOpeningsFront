# build
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# run
FROM nginx:alpine
COPY --from=node /app/dist/ChessOpeningsFront /usr/share/nginx/html
