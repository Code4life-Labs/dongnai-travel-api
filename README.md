# Task Manager Application

A simple task manager application.

<p align="center"><img src="https://github.com/user-attachments/assets/f0f173d0-94c3-44a2-832b-75288e92e408" /></p>

<p align="center"><img src="https://github.com/user-attachments/assets/0f926a15-1a7c-4842-8eee-873d64ad486a" /></p>

## Why do I build it?

I build this project is suitable for:

- An example of application with Microservice Architecture.
- Deploy with Container, Docker Compose, K8S.

## Tech stack

<p align="center"><img src="https://github.com/user-attachments/assets/b5b67573-f9da-4e42-9c2e-e935d540dc62" /></p>

## How to deploy?

There are some way to deploy this application, you can do it on your machine (PC, Laptop) or a provisioned virtual machine on Cloud (AWS, GCP, Azure, ...). And before we start, need to change some setup.

- Go to `src/user-web/.env`, change `VITE_MODE="dev"` to `"prod"`.

```
VITE_MODE="prod"
```

- If you are going to deploy to your own PC, you must have Docker inside your machine.
- You can test this application without create any account by using test account
  - Username: `user01`.
  - Password: `user01`.

Ok, let's start.

### Deploy with Docker

In this approach, we will deploy application with separated docker container. First of all, we have to create a network (bridge mode) that allows Docker container comunicating with each other.

```bash
docker network create my-network
```

Then we have to build all Docker Images, 5 images in total (Nginx + React, Task Service, Identity Service, Task Database, Identity Database).

```bash
# Build task-database image
docker build task-database/ -t task-database-image

# Build identity-database image
docker build identity-database/ -t identity-database-image

# Build task-service image
docker build task-service/ -t task-service-image

# Build identity-service image
docker build identity-service/ -t identity-service-image

# Build user-web image
docker build user-web/ -t user-web-image
```

Finally, run Docker Containers from these images.

```bash
# Run task.database
docker run -d --name task.database -p 27017:27017 --network my-network -e MONGODB_INITDB_ROOT_USERNAME=root -e MONGODB_INITDB_ROOT_PASSWORD=letmein12345 -e MONGODB_DATABASE=TaskManager task-database-image

# Run identity.database
docker run -d --name identity.database -p 3306:3306 --network my-network -e MYSQL_ROOT_USER=root -e MYSQL_ROOT_PASSWORD=letmein12345 -e MYSQL_DATABASE=TaskManagerIdentity identity-database-image

# Run task.service
docker run -d --name task.service -p 3000:3000 --network my-network -e MONGODB_INITDB_ROOT_USERNAME=root -e MONGODB_INITDB_ROOT_PASSWORD=letmein12345 -e MONGODB_DATABASE=TaskManager task-service-image

# Run identity.service
docker run -d --name identity.service -p 5000:5000 --network my-network -e MYSQL_ROOT_USER=root -e MYSQL_ROOT_PASSWORD=letmein12345 -e MYSQL_DATABASE=TaskManagerIdentity identity-service-image

# Run user web
docker run -d --name user-web -p 8888:80 --network my-network -e VITE_TASK_SERVICE_ENDPOINT="/task-service" -e VITE_IDENTITY_SERVICE_ENDPOINT="/identity-service" -e VITE_MODE="prod" user-web-image
```

### Deploy with Docker Compose

You simply run

```bash
docker compose -f _deployments/docker-compose.yml up
```

See the result!! But sometime MySQL will be unhealthy and I don't know what happend (it may be caused by Health check or MySQL Image).

### Deploy with K8S / Amazon EKS

Update later...
