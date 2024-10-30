pipeline {
    agent any 

    environment {
        FLY_API_TOKEN=credentials('FLY_API_TOKEN')
    }

    tools {
        nodejs "nodejs-18"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Pintar credencial') {
            steps {
                echo 'Hola esta es mi credencial: ${env.FLY_API_TOKEN}'
            }
        }

        stage ('Install fly.io') {
            steps {
               echo 'Installing Fly.io'
               withCredentials([string(credentialsId: 'FLY_API_TOKEN', variable: 'FLY_API_TOKEN')]) {
                  script {
                   sh('curl -L https://fly.io/install.sh | sh')
                   env.FLYCTL_INSTALL = "/var/jenkins_home/.fly"
                   env.PATH = "${env.FLYCTL_INSTALL}/bin:${env.PATH}"
                   sh 'flyctl auth token ${FLY_API_TOKEN}'
            }
          }
        }
      }
        
        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run test') {
            steps {
                echo 'Running test...'
                sh "npm run test"
            }
        }

        stage('Deploy to Fly.io') {
            steps {
                echo 'Deploying to Fly.io'
                sh '''
                export FLYCTL_INSTALL="/var/jenkins_home/.fly"
                export PATH="$FLYCTL_INSTALL/bin:$PATH"
                flyctl deploy --app flyio-jenkins-final --remote-only
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Deployment SUCCESS!!'
        }
        failure {
            echo 'Deployment FAIL!!'
        }
    }
}