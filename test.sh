export ENV=test
docker-compose --env-file .env.test up -d
npm run build
db-migrate --env test up
npm run jasmine 
db-migrate --env test reset
db-migrate --env test db:drop test
docker-compose --env-file .env.test down
export ENV=dev