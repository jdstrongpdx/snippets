# Cloud Governance Strategy
- the general process of establishing rules and policies and ensuring that they are enforced
- maintain control over your environment to ensure you are complaint with  
    - i.e Payment Card Industry Data Security Standard - PCIDSS


## Cloud Adoption Framework for Azure
- consists of tools, documentation, and proven practices needed to crate and implement your Business and Technology Strategies
    - define the strategy - Q&A, define your strategy
    - make a plan - matches specific goals to outcomes - adoption plan
    - ready your organization - landing zone - a place to deploy using best practices
    - adopt the cloud - migrate your applications
    - innovate - Azure innovation guide to create minimum viable product
    - govern - benchmark, governance plan and controls
    - manage - establish baseline, commitments, and exceptions

## Azure Resource Hierarchy
- Management Groups - manage access, policies, and compliance across subscriptions
- Subscriptions - groups user accounts and resources created by those users 
    - define separate subscriptions based on:
        - Billing - one billing report per subscription
        - Access Control - associated with an Azure AD tenant
        - Development boundary factor - development, test, production...
        - Subscription Limits - ex. max Azure ExpressRoute circuits is 10
- Resource Groups - logical container with multiple resources
- Resources - instances of services

## Azure Resource grouping using Resource Tags
- resource tags provide metadata about your resources 
    - resource management - resources associated with specific workloads, environments, business units and owners
    - cost management and optimization
    - operations management - how critical resource is to help formulate Service-Level Agreements (uptime/performance guarantee)
    - security
    - governance/compliance
    - workload optimization
- Use Azure Policy to set and enforce tags that have resource hierarchy inheritance 
- Stored in Name : Value pairs examples:
    - Appname : SpecialOrders
    - CostCenter : 0224 - Infrastructure R&D
    - Owner : guy@company.com
    - Environment : Test
    - Impact : High

## Azure Role-Based Access Control (RBAC)
- allows control over who has access to which Azure resources and what they can do
- assign roles to users, groups, or applications with a particular scope using INHERITANCE based on the resource hierarchy
- NOTE: does NOT enforces access permissions at the application and data level
- built-in roles
    - Reader - read only
    - Resource-specific
    - Custom - custom...
    - Contributor - full access to manage except for assigning roles
    - Owner -  full access including managing roles
- Azure RBAC is enforced by Azure Resource Manager which checks Authorization for all tasks
- Role Assignment - attaching a role to a security principle - at a particular scope - for the purpose of granting access.
- Security Principle - object that represents a user, group, service principal, or managed identity
- RBAC permissions are set in IAM in the Azure Portal

## Azure Resource Lock
- prevents resources from being accidentally deleted or changed at any level of the Azure Resource Hierarchy - CanNotDelete or ReadOnly locks

## Azure Blueprints
- define a repeatable set of governance tools and standard Azure resources that your organization requires
    - Role assignments
    - Policy assignments
    - Azure Resource Manager (ARM) Templates (JSON declarative infrastructure configuration)
    - Resource Groups
    - specify the required resource locks
- Implementation
    - Create a component definition - called an artifact
    - Assign
    - Track
    - NOTE: Blueprints include versioning to track and comment on changes

## Azure Policy
- for creation and reporting of policies and compliance
    - Create and manage policies 
    - See reports on resources that are not compliant
    - Block creation of non-compliant resources NOTE: blocks changes to existing non-compliant resources
    - Integrates with Azure DevOps to apply CI/CD pipeline policies in pre and post deployment phases
- Implementation
    - Create Policies - roles, security, tags, etc
    - Assign - assign policies to the resource hierarchy with inheritance
    - Review - after assigning, review the compliance report and take action
    - Policy Evaluation - occurs once an hour to ensure compliance

## Azure Policy Initiative
- groups policies into groups to ensure compliance with company initiatives
- enables policy monitoring in Security Center with recommendations
- Contains over 100 standard policy and compliance definitions such as HIPPA, ISO 27001 (security of IT systems), etc

# Privacy Compliance and Data Protection
- 

## Compliance Offerings
- Global (ISO, SOC, CSA...)
- US Government (DoD, NIST, ITAR...)
- Industry (SOX,, FERPA, HIPPA...)
- Regional (Canada, China, EU...)

## What data Microsoft Collects
- Microsoft Privacy Policy - what data is collected, how it is used
- Online Services terms - legal agreement between customer and Microsoft
- Data Protection Addendum - compliance, disclosure, data security, data
- Azure Compliance documentation - detailed descriptions of Azure compliance for services

## Microsoft Trust Center
- In-depth information about security, privacy, compliance offerings, policies, features and practices across Microsoft cloud products

## Azure Government 
- addresses the security and compliance needs of the US federal agencies, state and local governments, and their solution providers.