# node-app-cicd

🚀 Node.js Sample App
This is a simple Node.js web application used for DevOps training and CI/CD pipeline demonstration with Docker, Jenkins, SonarQube, and Kubernetes.

📦 Tech Stack
Node.js

Docker

Jenkins

SonarQube

ArgoCD (for GitOps deployment)

Kubernetes (for container orchestration)

🛠️ Features
Lightweight HTTP server built using Node.js

Returns a basic response on port 3000

Containerized using Docker

Integrated into a CI/CD pipeline

▶️ How to Run Locally

# Clone the repo
git clone https://github.com/priyanshu29/node-app-cicd.git
cd <your-repo-name>

# Install dependencies
npm install

# Start the server
node server.js
Then open your browser and go to http://localhost:3000.



🐳 Run with Docker

docker build -t node-app .
docker run -p 3000:3000 node-app



📂 Project Structure

- Dockerfile
- package.json
- server.js
- README.md
