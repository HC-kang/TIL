FROM docker:27.0.0-rc.1-dind

RUN apk add --no-cache nodejs npm

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "dockerd-entrypoint.sh"]
