## Netlify Dynamic DNS
Since Netlify does not support dynamic dns, this is a simple client written in Next js to support this functionality. To achieve, we are utlizing the [public netlify api](https://open-api.netlify.com/).

## Supported Functionality
- CRUD operations on A records
- assign a Record to be updated automatically to the current machine's public address based on provided CRON interval

## Configuration
| Environment Variable | Description                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------|
| NETLIFY_API_KEY      | your access token for netlify, you can generate one [here](https://app.netlify.com/user/applications) |
| POSTGRES_USER        | postgres user name for the postgres database                                                          |
| POSTGRES_PASSWORD    | postgres user password for the postgres database                                                      |
| POSTGRES_HOST        | host of the postgres database                                                                         |
| CRON_INTERVAL        | interval for the DDNS to update the public IP records                                                 |

## Local Usage
### Prerequistes
- local postgres server
- creat a database called ddns

### Steps
1. `git clone https://github.com/TheFatPanda97/netlify-dynamic-dns.git`
2. `npm ci`
3. create and configure `.env` with the environment varaibles in **configuration**
4. `npm run build`
5. `npm run start`

## Docker Usage
```yml
---
version: "3"

services:
  ddns:
    image: tfpanda97/netlify-ddns:latest
    environment:
      - NETLIFY_API_KEY=you_key
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_HOST=db
      - CRON_INTERVAL='* */1 * * *' # the cron job will execute every hour to update the indicated records to be the public ip address of the host machine
    ports:
      - 3000:3000
    depends_on:
      - db

  db:
    image: postgres
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=ddns

```
