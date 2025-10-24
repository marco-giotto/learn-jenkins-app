pipeline {
    agent any

    stages {
         stage('Test') {
             agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
             }
            steps {
                sh ''' 
                    test -f build/index.html
                    npm ci
                    npm run test
                '''
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh ''' 
                  ls -la
                  node --version
                  npm --version
                  npm run build
                  ls -la
                   
                '''
            }
        }

       
    }
}
