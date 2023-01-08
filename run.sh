export $(grep -v '^#' .env | xargs) # magic to export env variables in .env
export VALUE=$(curl -s ifconfig.me) # in my case I am adding a record for my public ip but you can of course change this
node index.js