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

        stage('E2E') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.56.1-noble'
                    reuseNode true
                }
            }
            steps {
                sh ''' 
                    npm run build
                    npm install serve
                    node_modules/.bin/serve -s build &
                    for i in {1..30}; do
                        if curl -s http://localhost:3000 >/dev/null; then
                            echo "Server is up!"
                            break
                        fi
                        echo "Waiting for server..."
                        sleep 1
                    done
                    npx playwright test --reporter=html
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
                junit 'jest-results/junit.xml'
            }
        }
}
