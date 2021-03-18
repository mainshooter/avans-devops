# Commands

docker network create coolnetwerk

## API

docker build -t week3_api .
docker run --rm -p 3000:3000 --network coolnetwerk --env host=db --name api week3_api

## Frontend
docker build -t week3_frontend .
docker run --rm -p 4200:4200 --network coolnetwerk week3_frontend

## Mongo

docker run --name mongo -d --rm -p 27016:27017 --network coolnetwerk --name db mongo
