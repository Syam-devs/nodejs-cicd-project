# 🚀 Node.js CI/CD Pipeline with GitLab, Docker & Self-Hosted GitLab Runner

## 📌 Project Overview

This project demonstrates a complete **CI/CD pipeline** for a Node.js application using **GitLab CI/CD**, **Docker**, **Docker Hub**, and a **self-hosted GitLab Runner on Ubuntu**.

Every code push automatically triggers the CI/CD pipeline, which:

* Installs project dependencies
* Executes automated API tests
* Builds a Docker image
* Pushes the image to Docker Hub
* Deploys the latest container on an Ubuntu self-hosted runner

The objective of this project is to automate the software delivery lifecycle while ensuring reliable, repeatable, and consistent deployments.

---

# 🏗 Architecture

```text
Developer Push
      │
      ▼
GitLab Repository
      │
      ▼
GitLab CI/CD Pipeline
      │
      ├───────────────┐
      ▼               │
Install Dependencies  │
      ▼               │
Run Automated Tests   │
      ▼               │
Build Docker Image    │
      ▼               │
Push Image to Docker Hub
      │
      ▼
Ubuntu Self-Hosted Runner
      │
      ▼
Pull Latest Docker Image
      │
      ▼
Deploy Container
```

---

# ⚙️ Tech Stack

| Technology    | Purpose                             |
| ------------- | ----------------------------------- |
| Node.js       | Backend Runtime                     |
| Express.js    | Web Framework                       |
| GitLab        | Source Code Management              |
| GitLab CI/CD  | Continuous Integration & Deployment |
| Docker        | Containerization                    |
| Docker Hub    | Image Registry                      |
| Ubuntu        | Deployment Server                   |
| GitLab Runner | Self-hosted Deployment Runner       |
| Jest          | Unit Testing                        |
| Supertest     | API Testing                         |

---

# 📂 Project Structure

```text
nodejs-cicd-project/
│
├── app.js
├── server.js
├── package.json
├── Dockerfile
├── .dockerignore
├── .gitlab-ci.yml
│
└── test/
    └── app.test.js
```

---

# 🚀 Features

* Node.js REST API
* Express.js server
* Health Check Endpoint
* Automated API Testing
* Dockerized Application
* Docker Hub Integration
* GitLab CI/CD Pipeline
* Self-hosted GitLab Runner
* Automatic Deployment
* Container Restart Policy
* Continuous Delivery Workflow

---

# 🌐 API Endpoints

## Home Endpoint

```http
GET /
```

Response

```text
DevOps CI/CD Project Running Successfully
```

---

## Health Check

```http
GET /health
```

Response

```json
{
  "status":"UP"
}
```

---

# 🧪 Automated Testing

The project uses:

* Jest
* Supertest

The pipeline automatically validates:

* HTTP Status Code
* API Response
* Health Endpoint

Run tests locally:

```bash
npm test
```

Expected Output

```text
PASS test/app.test.js

Tests: 2 passed
```

---

# 🐳 Docker Implementation

## Build Image

```bash
docker build -t nodejs-cicd .
```

## Run Container

```bash
docker run -d \
--name nodeapp \
-p 3000:3000 \
nodejs-cicd
```

## Verify Running Container

```bash
docker ps
```

---

# ⚡ GitLab CI/CD Pipeline

The pipeline is divided into four stages.

## 1️⃣ Install

* Install project dependencies
* Cache node modules

---

## 2️⃣ Test

* Execute Jest test cases
* Stop pipeline if any test fails

---

## 3️⃣ Docker Build & Push

* Login to Docker Hub
* Build Docker image
* Tag image
* Push image using:

  * Commit SHA tag
  * Latest tag

---

## 4️⃣ Deploy

The Ubuntu self-hosted GitLab Runner:

* Pulls latest Docker image
* Stops existing container
* Removes old container
* Deploys latest version
* Runs container with restart policy

---

# 🔄 CI/CD Workflow

```text
Developer Push
      │
      ▼
GitLab Pipeline Triggered
      │
      ▼
Install Dependencies
      │
      ▼
Run Tests
      │
      ▼
Build Docker Image
      │
      ▼
Push Image to Docker Hub
      │
      ▼
Ubuntu GitLab Runner
      │
      ▼
Pull Latest Image
      │
      ▼
Deploy Application
```

---

# 🔐 GitLab CI/CD Variables

The following protected variables are configured in GitLab:

| Variable        | Description         |
| --------------- | ------------------- |
| DOCKER_USERNAME | Docker Hub Username |
| DOCKER_PASSWORD | Docker Hub Password |

Sensitive credentials are securely managed using GitLab CI/CD Variables.

---

# ▶️ Run Locally

Clone the repository

```bash
git clone https://gitlab.com/syamasundarraodatti/nodejs-cicd-project.git
```

Navigate to the project

```bash
cd nodejs-cicd-project
```

Install dependencies

```bash
npm install
```

Run the application

```bash
npm start
```

Run tests

```bash
npm test
```

---

# 💡 Key Learning Outcomes

* CI/CD pipeline implementation using GitLab
* Docker image creation and versioning
* Docker Hub integration
* Automated application testing
* Self-hosted GitLab Runner configuration
* Secure credential management
* Continuous deployment automation
* Containerized application deployment

---

# 💼Overview

> I developed a complete CI/CD pipeline for a Node.js application using GitLab CI/CD. Whenever code is pushed to the GitLab repository, the pipeline automatically installs dependencies, executes automated API tests using Jest and Supertest, builds a Docker image, pushes the image to Docker Hub, and deploys the latest version using a self-hosted GitLab Runner running on Ubuntu. This automation eliminates manual deployment, improves consistency, and ensures that only successfully tested code is deployed.

⭐ If you found this project helpful, consider giving it a star!
