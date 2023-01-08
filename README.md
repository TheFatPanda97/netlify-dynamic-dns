## Netlify Dynamic DNS
Since Netlify does not support dynamic dns, this is a relatively simple script written in Javascript to support this functionality. To achieve, we are utlizing the [public netlify api](https://open-api.netlify.com/).

## How it works
1. Grab all dns records in to check if an A record already exists for the target HOSTNAME
2. If an existing A record exists, delete it
4. Create an new A record with the provided configs

## Configuration
| Environment Variable | Description                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------|
| ACCESS_TOKEN         | your access token for netlify, you can generate one [here](https://app.netlify.com/user/applications) |
| DNS_ZONE             | zone for the domain you want to update, eg. example_com                                               |
| HOSTNAME             | host name, eg. host                                                                                   |
| DOMAIN               | domain that you are updating, eg. example.com                                                         |
| NODE_PATH            | absolute path to node, this is for cron purposes                                                      |

## Usage Example
1. `git clone https://github.com/TheFatPanda97/netlify-dynamic-dns.git`
2. `npm install`
3. create and configure `.env` (have a look at .env.example)
4. `./run.sh`
5. Optional: you can configure the run.sh to be executed automatically through cron
