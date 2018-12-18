#!/bin/sh

VERSION=$(cat .version | tr -d '\n')

echo Building nalej/web:build
docker build -t nalej/web:build . -f components/web/Dockerfile.build
docker container create --name extract nalej/web:build  
docker container cp extract:/ng-app/dist ./dist  
docker container rm -f extract

echo Building nalej/web:$VERSION

docker build --no-cache -t nalejregistry.azurecr.io/nalej/web:$VERSION . -f components/web/Dockerfile.serve
rm -rf ./dist
