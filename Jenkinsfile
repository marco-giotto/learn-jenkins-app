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
                    npm ci
                    npm run test
                '''
            }
        }

         stage('ENE test') {
             agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.56.1-noble'
                    reuseNode true
                }
             }
            steps {
                sh ''' 
                    npm install serve
                    node_modules/.bin/serve -s build
                    npx playwright test
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
                  test -f build/index.html
                '''
            }
        }
    }
    post {
            always {
                junit 'test-results/junit.xml'
            }
        }
}
