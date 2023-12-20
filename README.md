# Examserver

## Introduction
This project is a Dockerized application consisting of a MySQL database, a backend service with SpringBoot, and a frontend with Angular. This README outlines the steps to get the application up and running using Docker.

## Prerequisites
Before you begin, ensure you have the following installed:
- Docker

## Running the Application
To run the application, follow these steps:

### Pull Docker Images:
Instead of cloning a Git repository, directly pull the Docker images for the backend and frontend using the following commands:

```bash
docker pull rohiiiit/backend
docker pull rohiiiit/examserver
```

## Create a Docker Network:
Create a Docker network named `spring-network`:

```bash
docker network create spring-network
```

## Start the MySQL Database:
Run the MySQL database container with the following command:

```bash
docker run -p 3307:3306 --name mysqldb --net spring-network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=examdata mysql:8.0.35
```

## Start the Backend Service:
In a new terminal, start the backend service:

```bash
docker run -p 9090:8080 --name backend --net spring-network -e MYSQL_HOST=mysqldb -e MYSQL_USER=root -e MYSQL_PASSWORD=root -e MYSQL_PORT=3306 rohiiiit/backend
```

## Start the Exam Server:
Finally, run the exam server:

```bash
docker run --name examserver --network spring-network -p 80:80 -d rohiiiit/examserver
```

## Accessing the Application
- The MySQL database is accessible at `localhost:3307`.
- The backend service is available at `localhost:9090`.
- The exam server can be accessed through `localhost`.

## Troubleshooting
If you encounter any issues, ensure that:
- Docker is running on your machine.
- Ports 3307, 9090, and 80 are not being used by other services.
- The Docker network `spring-network` is created successfully.

For further assistance, please open an issue in this repository.
