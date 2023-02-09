# API for wishlists BuyOrGive web application


## Stack

- TypeScript
- PostgreSQL + TypeORM
- Nest.js


##Functionality

[Link to Swagger API documentation](https://app.swaggerhub.com/apis/zlocate/KupiPodariDay/1.0.0#/info)

Not authorized user can see main page with 20 popular and 40 last wishes.

Authorized user can:
- create/update/delete his own wishes (if there is no offers yet)
- create offers for someone else wishes
- update user profile
- search for other users (by username or email)
- copy wishes

##To create Database:
- CREATE USER student WITH PASSWORD 'student';
- CREATE DATABASE kupipodariday;
- GRANT ALL PRIVILEGES ON DATABASE kupipodariday TO student;

## To start the project:
- clone repository
- run npm install to install dependencies
- npm run start:dev to start application in dev mode

[Link to frontend repository](https://github.com/ElenaSolov/kupipodariday-frontend)