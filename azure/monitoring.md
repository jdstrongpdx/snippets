# Monitoring Services & Management in Azure

# Monitoring Services

## Monitoring Questions
- Cost
- Performance
- Security
- Resilience 
- Diagnostic
- Outage causes
- Planned Downtime

## Decision Criteria
- Reduce cost, Improve resilience, Harden security => Azure Advisor
- Monitor services and regions, upcoming planned outages, services to be sunset, alerts for incidents and downtime => Azure Service Health
- Track VM performance, create reports or notifications, measure custom events, setup alerts for events => Azure Monitor

## Azure Advisor
- evaluates resources and makes recommendations for optimization
    - Reliability - continuity of your business critical applications
    - Security - detect threats and vulnerabilities 
    - Performance - improve the speed of your applications
    - Cost - optimize and reduce your Azure spending
    - Operational excellence - achieve process and workflow efficiency, resource manageability and deployment best practices.

## Azure Monitor
- a platform for collecting, analyzing, visualizing, and taking action based on metric and logging data from your entire Azure and on-premises environment
- You can view real-time and historical performance data or receive notifications
- Azure Insights uses Azure Monitor data for telemetry information, data-analysis, application operation insights and error diagnostics.


## Azure Service Health
- Notifies about service incidents and planned maintenance across services, regions and resources
- Can setup notification or receive RCA reports on the cause of an outage
    - Service issues - current problems - i.e. outages
    - Health advisories - future warnings about changes
- Track planned maintenance events with ability to select when to reboot a service

# Azure Management Tools

## Decision Criteria
- One off actions =>
    - Azure Portal for GUI or reporting
    - Azure Mobile for GUI on the go
    - Azure Powershell for Windows Admin Environments
    - Azure CLI for Linux Admin Environments
- Repeated actions =>
    - Azure Resource Manager (ARM) Templates

## Infrastructure as Code
- Imperative Code - details each individual step that should be performed
- Declarative Code - details only the desired outcome and allows an interpreter how to achieve the outcome

## Azure Powershell and Azure CLI
- can execute Azure commands called commandlets
- Commands use the Azure REST API to perform every possible management task in Azure
- commands can be performed individually or run in a script file (Imperative)

## Azure Resource Manager Templates 
- describe the resources in Declarative JSON 
- the entire file is verified before execution to ensure resources will be created and connected correctly
- resources can be provisioned in parallel

## Visual Tools
- GUI configuration of resources
- Includes the Azure mobile app to monitor health and status, fix issues, run CLI commands

## Code Based Tools
- programmatic configuration of resources that can be quickly setup, saved, and stored in repositories
