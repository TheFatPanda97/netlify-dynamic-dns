export $(grep -v '^#' .env | xargs) # magic to export env variables in .env
node index.js