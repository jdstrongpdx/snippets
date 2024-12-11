# DevOps

## Definitions
- DevOps: The union of people, process, and products to enable continuous delivery of value to our customers

- Agile planning: Together, we'll create a backlog of work that everyone on the team and in management can see. We'll prioritize the items so we know what we need to work on first. The backlog can include user stories, bugs, and any other information that helps us.

- Continuous integration (CI): We'll automate how we build and test our code. We'll run that every time a team member commits changes to version control.

- Continuous delivery (CD): CD is how we test, configure, and deploy from a build to a QA or production environment.

- Monitoring: We'll use telemetry to get information about an application's performance and usage patterns. We can use that information to improve as we iterate.

## Benefits
- Deploy more frequently
- Reduce lead time from commit to deploy
- Reduce change failure rate
- Recover from incidents more quickly

## Azure Devops Tools
1. Boards - Agile task manager
2. Repos - repositories
3. Pipelines - build, test and deploy with CI/CD
4. Test Plans - manual and exploratory testing tools
5. Artifacts - create, host, and share packages

Azure Pipelines configuration settings
- job: a series of steps—or tasks—that run sequentially as a unit
- strategy: defines how your application is rolled out
- connection: service connections are needed to deploy your app to an Azure resource
    - service principal authentication
    - managed identities for Azure
``` yml
- stage: 'DeployDev'
  displayName: 'Deploy to dev environment'
  dependsOn: Build
  jobs:
  - deployment: Deploy
    pool:
      vmImage: 'ubuntu-20.04'
    environment: dev
    variables:
    - group: 'Release Pipeline'
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: drop
          - task: AzureWebApp@1
            displayName: 'Azure App Service Deploy: website'
            inputs:
              azureSubscription: 'Resource Manager - Tailspin - Space Game'
              appName: '$(WebAppName)'
              package: '$(Pipeline.Workspace)/drop/$(buildConfiguration)/*.zip'

```

## Build Process using Azure Pipelines
1. Take the build artifact