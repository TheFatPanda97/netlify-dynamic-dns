FROM node:18
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install dnsutils -y
RUN apt-get install -y sqlite3 libsqlite3-dev
COPY . ./
RUN sqlite3 /src/db/data.db < /src/db/db.schema
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]