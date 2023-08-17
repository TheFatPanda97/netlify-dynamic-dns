FROM node:18
RUN apt-get update
RUN apt-get install dnsutils -y
COPY . ./
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "both"]