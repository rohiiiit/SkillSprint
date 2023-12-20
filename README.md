# SkillSprint

## Introduction
**SkillSprint** is a comprehensive online examination portal designed to facilitate online exams. This platform is tailored for both users who wish to take exams and admins who manage the exam process. It offers a user-friendly interface for exam takers and a robust management system for administrators.

## Features

### For Users
- **User Login:** Secure login system for exam takers.
- **Exam Participation:** Ability to take various exams available on the portal.
- **Result Viewing:** Users can view their marks after completing the exams.

<img src="https://github.com/rohiiiit/examserver/assets/68510500/1f25fd98-0135-4419-9211-5857f61c6522" width="500">


### For Admins
- **User Management:** Admins can manage user accounts, including creation and maintenance.
- **Category Management:** Ability to create and manage different categories of exams.
- **Quiz Management:** Admins can add new quizzes and view existing ones.

<img src="https://github.com/rohiiiit/examserver/assets/68510500/0667e382-0792-4f50-bbb1-54f2a4fe6cc4" width="500">
<img src="https://github.com/rohiiiit/examserver/assets/68510500/7949c101-6dac-413b-9982-b57a9d61f831" width="500">
<img src="https://github.com/rohiiiit/examserver/assets/68510500/67f433c2-9099-4afd-af17-9186a6722d40" width="500">
<img src="https://github.com/rohiiiit/examserver/assets/68510500/d81db8c0-68ed-49c9-a32b-7d00a5785193" width="500">

## Getting Started

### Prerequisites
- Ensure you have [Docker](https://www.docker.com/) installed on your machine.

### Installation and Running the Application
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
