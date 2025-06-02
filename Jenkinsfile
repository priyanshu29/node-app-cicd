pipeline {
  agent any
  environment {
    SONAR_TOKEN = credentials('sonar-token-id')
    DOCKER_HUB_USER = 'priyanshu0998'
    DOCKER_IMAGE = 'node-app'
    REGISTRY = 'docker.io'
  }

  stages {
    stage('Checkout Application Code') {
      steps {
        git branch: 'main', url: 'https://github.com/priyanshu29/node-app-cicd.git'
      }
    }

    stage('Code Analysis using SonarQube') {
      steps {
        withSonarQubeEnv('SonarQube') {
          withEnv(['PATH+SONAR=/opt/sonar-scanner/bin']) {
          sh 'sonar-scanner'
          }
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_HUB_USER/$DOCKER_IMAGE:latest .'
      }
    }

    stage('Push into Image Registry') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PWD', usernameVariable: 'DOCKER_USER')]) {
          sh '''
            echo "$DOCKER_PWD" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $DOCKER_HUB_USER/$DOCKER_IMAGE:latest
          '''
        }
      }
    }

    stage('Deploy into Kubernetes Cluster using ArgoCD') {
      steps {
        sh '''
          git clone https://github.com/priyanshu29/node-k8s-deploy.git
          cd node-k8s-deploy/deployment
          sed -i 's|priyanshu0998/node-app:.*|priyanshu0998/node-app:latest|' deployment.yaml
          git config user.email "priyanshut7@gmail.com"
          git config user.name "priyanshu29"
          git commit -am "Updated image tag to latest"
          git push origin main
        '''
      }
    }
  }
}
