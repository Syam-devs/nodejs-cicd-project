# 🚀 Node.js CI/CD Pipeline using GitLab, Docker, Docker Hub & Ubuntu Server

## 📖 Project Overview

This project demonstrates a complete CI/CD (Continuous Integration and Continuous Deployment) pipeline for a Node.js application using GitLab CI/CD, Docker, Docker Hub, and a self-hosted GitLab Runner running on Ubuntu Server.

Whenever code is pushed to the GitLab repository, the pipeline automatically installs project dependencies, executes automated API tests, builds a Docker image, pushes the image to Docker Hub, and deploys the latest version of the application using a self-hosted GitLab Runner.

The primary objective of this project is to automate the software delivery process, reduce manual deployment effort, improve deployment consistency, and ensure that only successfully tested code is deployed.

---

# 🏗 Architecture

```text
Developer Push
      │
      ▼
GitLab Repository
      │
      ▼
GitLab CI Trigger
      │
      ▼
Install Dependencies
      │
      ▼
Run Automated Tests
      │
      ▼
Build Docker Image
      │
      ▼
Push Image to Docker Hub
      │
      ▼
Ubuntu Server (Self-Hosted GitLab Runner)
      │
      ▼
Pull Latest Docker Image
      │
      ▼
Deploy Container
```

---

# 📁 Project Setup

Create the project directory.

```bash
mkdir nodejs-cicd-project
cd nodejs-cicd-project
```

---

# 💻 Application Development

## Create `app.js`

```javascript
const express=require("express");

const app=express();

app.get("/",(req,res)=>{
res.status(200).send(
"DevOps CI/CD Project Running Successfully"
);
});

app.get("/health",(req,res)=>{
res.status(200).json({
status:"UP"
});
});

module.exports=app;
```

### Purpose

- Provides the application's REST API.
- The `/` endpoint returns a success message.
- The `/health` endpoint is used as a health check.
- Exports the application for automated testing.

---

## Create `server.js`

```javascript
const app=require("./app");

const PORT=3000;

app.listen(PORT,()=>{
console.log(`Application started on ${PORT}`);
});
```

### Purpose

Starts the Express application and listens on port **3000** for incoming requests.

---

# 📦 Dependency Management

## Create `package.json`

```json
{
  "name":"nodejs-cicd-project",
  "version":"1.0.0",

  "scripts":{
      "start":"node server.js",
      "test":"jest --runInBand"
  },

  "dependencies":{
      "express":"^4.18.2"
  },

  "devDependencies":{
      "jest":"^29.7.0",
      "supertest":"^7.0.0"
  }
}
```

Install dependencies.

```bash
npm install
```

### Purpose

- **Express.js** is used to build the REST API.
- **Jest** is used for automated testing.
- **Supertest** is used to test API endpoints.

---

# 🧪 Automated Testing

Create the test directory.

```bash
mkdir test
```

Create `test/app.test.js`

```javascript
const request=require("supertest");
const app=require("../app");

describe("API Tests",()=>{

test("GET /",async()=>{

const response=await request(app)
.get("/");

expect(response.statusCode)
.toBe(200);

expect(response.text)
.toBe("DevOps CI/CD Project Running Successfully");

});

test("GET /health",async()=>{

const response=await request(app)
.get("/health");

expect(response.statusCode)
.toBe(200);

expect(response.body.status)
.toBe("UP");

});

});
```

### Purpose

The automated tests verify:

- Home endpoint response
- Health endpoint response
- HTTP status codes
- API responses

These tests are automatically executed during the CI/CD pipeline before deployment.

---

# ▶️ Run the Application Locally

Start the application.

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Run automated tests.

```bash
npm test
```

Expected Output

```text
PASS test/app.test.js

Tests: 2 passed
```

---

# 🐳 Docker Configuration

## Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
```

### Purpose

- Uses the official Node.js 18 Alpine image.
- Creates the application working directory.
- Installs dependencies.
- Copies the application source code.
- Exposes port **3000**.
- Starts the application.

---

## Create `.dockerignore`

```text
node_modules
.git
coverage
```

This file excludes unnecessary files from the Docker image, reducing image size and improving build performance.

---

# 🐳 Test Docker Image

Build the Docker image.

```bash
docker build -t nodejs-cicd .
```

Run the container.

```bash
docker run -d --name nodeapp -p 3000:3000 nodejs-cicd
```

Verify the running container.

```bash
docker ps
```

---

# 📦 Docker Hub Integration

Create a Docker Hub repository.

```text
nodejs-cicd
```

Login to Docker Hub.

```bash
docker login
```

Docker Hub is used to store versioned Docker images generated during the CI/CD pipeline.

---

# 🌿 Push Code to GitLab

```bash
git init

git add .

git commit -m "Initial commit"

git remote add origin YOUR_GITLAB_URL

git push -u origin main
```

---

# 🔐 Configure GitLab CI/CD Variables

Navigate to:

```
Project → Settings → CI/CD → Variables
```

Add the following variables.

```text
DOCKER_USERNAME=yourdockerusername
DOCKER_PASSWORD=yourdockerpassword
```

Configure the Docker password as a **Masked** variable to securely protect sensitive credentials.

---

# 🖥️ Configure Ubuntu Server & GitLab Runner

Install GitLab Runner on the Ubuntu Server.

```bash
curl -L --output gitlab-runner.deb https://gitlab-runner-downloads.s3.amazonaws.com/latest/deb/gitlab-runner_amd64.deb

sudo dpkg -i gitlab-runner.deb
```

Install Docker, configure the GitLab Runner with Docker permissions, and register the runner using the **Shell Executor**.

*(Use your existing commands here.)*

---

# ⚙️ Configure GitLab CI/CD Pipeline

Create the `.gitlab-ci.yml` file.

*(Use your existing pipeline without modification.)*

---

# 🚀 Pipeline Stages

### Install

Installs all required Node.js dependencies.

### Test

Runs automated API tests using Jest and Supertest. The pipeline stops immediately if any test fails.

### Docker

Builds the Docker image, tags it with the commit SHA and `latest`, and pushes both images to Docker Hub.

### Deploy

The Ubuntu self-hosted GitLab Runner pulls the latest Docker image, removes the previous container if it exists, and deploys the updated application automatically.

---

# ▶️ Execute the Pipeline

Push the latest changes.

```bash
git add .

git commit -m "Added GitLab CI/CD pipeline"

git push
```

Pipeline Result

```text
✔ Install
✔ Test
✔ Build
✔ Push
✔ Deploy
```

---

# 📋 Project Summary

This project demonstrates an end-to-end CI/CD pipeline for a Node.js application using GitLab CI/CD, Docker, Docker Hub, and an Ubuntu Server with a self-hosted GitLab Runner.

Every code push automatically triggers the pipeline, which installs dependencies, executes automated tests, builds a Docker image, pushes it to Docker Hub, and deploys the latest version of the application.

This automation minimizes manual deployment effort, improves deployment consistency, and ensures that only successfully tested code is released.

---

# ✅ Testing Strategy

The project uses **Jest** and **Supertest** for automated API testing.

- Developers create and maintain unit and API tests.
- GitLab CI/CD automatically executes the tests during every pipeline run.
- Deployments proceed only when all test cases pass successfully.

gitlab repo : https://gitlab.com/syamasundarraodatti/nodejs-cicd-project
