# Managing Azure Costs

## Total Cost of Ownership Calculator
- compare the cost of running on-premises vs in the cloud with a side by side report
1. Define workloads - infrastructure requirements
    - Service - os, VMs, CPU cores, memory
    - Database - types, hardware, concurrent users
    - Storage - type, capacity
    - Network - bandwidth
2. Adjust assumptions
    - Software licenses 
    - Cloud replication
    - Cost assumptions - electricity, manpower, etc...
3. View the report


## Azure Purchasing
1. Azure Subscriptions
    - Free trial - 12 months of free services
    - Pay as you go - Pay for what you use, volume discounts, prepaid invoicing
    - Member offers - credits and reduced rates for Visual Studio, Startups and Imagine
2. Azure Purchasing
    - Enterprise Agreement - three year spending commitment paid annually
    - Direct purchase on the web - monthly standard prices
    - Cloud Solution provider 
3. Factors affecting Costs
    - Resource type (Tiers)- resource configurations 
    - Usage meters - track usage
    - Resource usage
        - only run resources when needed
        - deallocate idle VMs
        - regularly review infrastructure on your account
    - Azure Subscription type
    - Azure Marketplace - third party software or services
    - Region - regions have different costs for services
    - Network Traffic
        - Some inbound is free
        - Outbound data transfer is based on billing zone
    - Support Services - payments for support levels 
    - Dev-Test pricing - pricing when you run resources in an Azure Subscription based on a dev-test offer.
    - move from IaaS to PaaS to reduce licenses, configuration, manpower

## Azure Pricing Calculator
- crate a detailed cost estimate for services

## Minimizing Costs
1. Understand the costs before you deploy
2. Consider the products, services, and resources you need
3. Read the relevant documentation
4. Calculate your projected costs
5. Only add the products, services, and resources that you need

## Azure Advisor
- identifies unused or underutilized resources sorted by impact
- recommends unused resources you can remove

## Spending Limits - services are stopped and removed once a spending limit is reached 

## Quotas
- limits the number of resources that can run

## Azure Reservations
- up to 72% by paying in advance for usage capacity

## Azure Cost Management + Billing
- used to understand and control spending

# Service Level Agreements
- formal agreement that defines performance standards for services on Azure
- each Azure service defines it own SLA for uptime and connectivity
- Service Credit - a percentage of paid fees credited back NOTE: you have to file a claim within one month (typical)

## Azure Status
- provides a display of all service statuses for downtime
- you can connect the status of services to notifications if they go down
- Azure Status Health - a personalized view of your services and their status

## Application SLA
- define criticality of applications you build on Azure
    - do other apps/services depend on it?
    - what are the impacts to your customer?
    - what are critical vs non-critical time periods?
- understand the SLA of the services you are using 
    - 99.9% = 10.1 min/week or 43 min/month downtime
    - 99.99% - 1 min/week or 4 min/month
    - composite SLA - weighted average of SLAs from services
- include redundancy to increase availability - duplicate components across several regions
- performance above 99.9% are very difficult to achieve and can get very expensive and complex to manage
- your application should be able to self-diagnose and self-recover in the event of an outage...

## Azure Preview Services
- Azure services in development and not ready for production yet
- General Availability - once a Azure Service is released for production