# Description

This project is for a School's Exam and Results Computation. Teachers supply students scores in assessements and exams and it computes the average, assigns grades and positions for each subject and the overall results. It comprises of assigning roles with varying permissions. It also presents data using statistical tools such as pie charts and bar charts, and shows performance by subject teachers and performance in students average. It's built with Nestjs, Postgres, Docker, RabbitMQ and other CI tools.

## Running the app

- Rename `.env.example` to `.env` and update the parameter values.
- Ensure you have Docker installed and started, then start the application with: 

```bash
$ docker-compose up

then connect to your DBMS to view the database.

# to bring down the application:

$ docker-compose down
```

## Test

```bash
# unit tests
$ docker-compose exec api npm test 

 or 

$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
