FROM node:18
RUN apt-get update
RUN sudo apt-get -y upgrade
RUN apt-get install dnsutils -y
RUN sudo apt-get install -y sqlite3 libsqlite3-dev
RUN mkdir src/db
RUN sqlite3 /src/db/data.db < /src/db/db.schema
COPY . ./
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]