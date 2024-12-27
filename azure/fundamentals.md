# Azure Fundamentals

## Advantages

### Azure Portal - web based unified console
Benefits
1. Build, Manage, and Monitor services
2. Create custom dashboards
3. Configure accessability options

### How Azure Works
- Virtualization via a Hypervisor - emulates the functions of a computer with abstracted hardware
    - Each server has a hypervisor
    - Each rack has a fabric controller 
    - Orchestrator - responsible for managing everything including API requests

### Overview of Azure Services
1. Compute - VM, Container, and Serverless instances
2. App Hosting - manage applications
3. Internet of Things (IoT) - integrate sensors and devices
4. Security
5. AI - machine learning
6. DevOps
7. Networking - private networking connections 
8. Storage - disks, databases, data-share
9. Integration - logic apps and service busses 
10. Databases

## Cloud Benefits

### Cost
- Consumption Based Model - Pay as you go - pay for the services you use
- Capital Expenditure (CapEx) - upfront spending and depreciation/amortized 
- Operational Expenditure (OpEx) - billed at the moment of use

### Maintenance
- Cloud provider maintenance - not responsible for initial cost, upkeep, uptime, and maintenance

### Concepts
- Be ready for the future 
- Build on your terms
- Operate hybrid seamlessly
- Trust your cloud - security 

### Features
- High Availability
- Scalability
    - Vertically by increasing RAM/CPUs to a VM
    - Horizontally - adding instances of a resource
- Elasticity - can auto-scale to meet the demands
- Agility - cloud resources can be quickly provisioned and decommissioned 
- Geo-distribution - data can be distributed decreasing access time
- Disaster recovery - automatic backups and distribution fallback

### Primary Cloud Services
- Compute power - how much processing
- Storage - adjustable storage space
- Networking - 

### Cloud Service Models 
- IaaS - control over the hardware (networking, servers, storage, virtualization)
- PaaS - Serverless - IaaS plus OS, Middleware, Runtime (OS)
- SaaS - PaaS plus Data Storage, Applications (Hosted Applications)

### Cloud Deployment Models
- Public Clouds - Services are owned and operated by a third-party provider and open to the public internet. 
- Private Clouds - consists of resources used exclusively by users from one business or organization. May be hosted by a third-party provider.
- Hybrid Clouds - blend between private and public clouds

## Architecture

Organizing Structure 
- Management Groups - manage access, policy, and compliance for multiple subscriptions
- Subscriptions - groups user accounts and resources created by the user with limits or quotas for the amount of resources - used to manage costs and overall resources
- Resource Groups - resources are grouped to act as a logical container for web apps, storage, databases, etc...
- Resources - instances of services you create

### Management Groups
- A container for subscriptions that apply governance conditions/policies/limitations
    - Create a hierarchy that applies a policy
    - Provide user access to multiple subscriptions - Role-Based Access Control (RBAC)
- Structures
    - Environments (Dev, Test, Prod)
    - Organizational Structures (Team/Product/Division)
    - Billing
    - Subscription Limits (maximum resources for a single subscription set by Azure)
- Limits
    - 10000 management groups per directory
    - Management group tree up to 6 levels deep - not including root or resource
    - Each management group and subscription can support only one parent
    - Each group can have many children
    - All subscriptions and management groups are within a single hierarchy in each directory

### Subscriptions
- at least one subscription is required
- provides authenticated and authorized access to products and services
- logical unit of Azure services that link to an Azure account: an identity in Azure Active Directory (Azure AD) and determines how an Azure account is billed
- Subscription boundaries
    - Billing boundary - 
    - Access control boundary - 
- Charges
    - Multiple subscriptions
    - Invoice Section - line item billing for one/more subscription group
    - Billing Profile - own monthly invoice and payment method for one/more Invoice

### Resource Groups
- DEF: a container that holds related resources for an Azure solution
- A logical container for resources deployed on Azure
- All resources can only be a member of one resource group
- Cannot be nested
- Organization  
    - Organize by logical grouping for production environments
    - Organize by life cycle in non-production environments
    - Apply RBAC permissions to ease administration and limit access

- Azure Resource Manager (ARM): the deployment and management service for Azure
    - Create, Update, Delete resources
    - Access control locks, tags
    - Controls service access requests to ALL services via AUTH and then forwards the request to the service
    - ARM API's can be controlled through the Azure Portal, Azure PowerShell, Azure CLI, and REST clients
    - Can use ARM Templates to configure to easily redeploy through the development lifecycle
    - Benefits Overview
        - Deploy resources
        - Manage infrastructure
        - Define dependencies
        - Redeploy solutions
        - Apply access control
        - Apply tags 
        - Clarify billing for resources with the same tag

### Resources 
- DEF: a manageable item that's available through Azure VM or VM storage accounts - VMs, storage, web apps, databases, virtual networks...
- 

## Azure Regions
- Azure Region: a geographical area that contains at least one data center.
- Services that don't require a region: Active Directory, Traffic Manager, DNS
- Regions allow
    - Resources to be closer to the user
    - Better scalability and redundancy
    - Preserve data residency for your services
    - Specialized regions for compliance purpose (DOD, GOVT)
- Region Pairs: 
    - Regions are always paired to provide redundancies from disasters, outages, and unrest
    - Handle Azure Outages - one of the pairs is prioritized for bring back online
    - Planned Updates - updates are rolled out to one region at a time
    - Data resides within the same geographical pair for legal/compliance 

## Availability Zones (AZ)
- physically separate data centers within the same region to support redundancy 
- run mission critical applications by co-locating your resources withing a zone and replicating it in other zones.
- primarily used for VMs, managed disks, load balancers, and SQL databases
- Categories of AZ
    - Zonal services - you pin the resource to a specific zone
    - Zone redundant services - replicates automatically across zones





