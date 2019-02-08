def slack = new org.daisho.Slack()

pipeline {
    agent { node { label 'node' } }
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    stages {
        stage("Variable initialization") {
            steps { stepVariableInitialization packagePath }
        }
        stage("Dependency download") {
            steps { container("node") { stepNodeDependencyDownload() } }
        }
        stage("Unit tests") {
            steps { container("node") { stepAngularUnitTests() } }
        }
        stage("Frontend build") {
            steps { container("node") { stepAngularBuild } }
        }
        stage("Publish image to Docker") {
            when { branch 'master' }
            steps { container("docker") { stepPublishToDocker packagePath, appsList, "nalej" } }
        }
    }
    post {
        success { script { slack.sendBuildNotification("success", "good") } }
        failure { script { slack.sendBuildNotification("failure", "danger") } }
        aborted { script { slack.sendBuildNotification("aborted", "warning") } }
    }
}
