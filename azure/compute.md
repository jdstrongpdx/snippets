# Azure Compute Services

## Main Services:
- Azure Virtual Machines
- Azure App Service
- Azure Container Instances
- Azure Kubernetes Service
- Azure Functions
- Windows Virtual Desktop

## Overview
- On-demand computing service for running Cloud-based applications
- Provides disks, processors, memory, networking, and operating systems
- Scalability 
- Supports Linux, Windows Server, SQL Server, Oracle, IBM and SAP


## Azure Virtual Machines 
- IaaS software emulations of physical computers including virtual processors, memory, storage, and networking resources.  
- Provide total control over the operating system, environment, custom software, and hosting configurations
- You do not have to maintain the physical hardware, but are responsible to configure, update and maintain software running on the machine.
- VM Images - a template used for creation
- VM Scale Sets - deploy and centrally manage a group of identical load balanced VMs.  Scaling can be automated, manual, or both.
- VM Batch - large scale High Performance Computing (HPC) with tends, hundreds, or thousands of VMs used for batch processing
    - Starts a pool of compute VMs
    - Installs applications and staging data
    - Runs jobs, identifies failures, and re-queues work
    - Scales down the VM pool as work completes
- VM Uses
    - VIRTUALIZE THE HARDWARE
    - Testing & Development - quickly create different environments and configurations
    - Running applications in the cloud
    - Extending on-premises data center operations into the cloud when extra demand is needed
    - Disaster recovery - if a data center fails, a new one can be provisioned to run critical applications temporarily
    - Lift and Shift - moving from a physical server to a VM cloud instance
    - Limited to a single OS/Environment per VM and provisioning takes minutes

## Azure Container Service (ACS)
- Container - a lightweight virtualization environment designed to be created, scaled, stopped, or re-started dynamically. Smaller size, quicker provisioning, and easier orchestration
- Container Host - standardized runtime environment allowing different containers to run together
- ACS supports Docker, 
- Uses
    - VIRTUALIZE THE OPERATING SYSTEM
    - Can run multiple instances of an application on a single host machine

## Azure Container Orchestration
- Azure Kubernetes Service (AKS) - a complete orchestration service for containers with distributed architectures and large volumes of containers.
    - Definition - combines container management automation with an extensible API to create a cloud native application management powerhouse
    - Pods (consist of one or more containers) => Cluster Node.
    - Pods scale horizontally, provide staggering updates, and rollbacks
    - Storage - hold local storage available to all containers or connections to Azure Storage or Cosmos DB
    - Networking - communication and name resolution in the cluster, exposing internet, load balancing across replicated pods, network isolation, and policy driven security
    - Orchestration - the task of automating and managing a large number of containers and how they interact
- Azure Container Instances (ACI) - PaaS that will run containers simply and quickly
- Microservice Architecture -  a collection of small autonomous services that each implement a single business capability (ex MVC).  Each service should be autonomous and rely on its own set of data (some say each having its own database if needed). Microservices communicate via API's and ideally has a orchestrator that manages calls between microservice elements.

## Azure App Service
- PaaS can quickly build, deploy and scale enterprise web, mobile, and API apps
- Used for Web Apps, Background Jobs, Mobile Backends and RESTful APIs
- Automatic scaling and high availability with built in load balancing, traffic management.
- Windows and Linux OS.
- ASP.NET, ASP.NET Core, Java, Ruby, Node.js, PHP, or Python languages.
- Automated deployments using GitHub, Azure DevOps, or git repos.
- You pay for the compute resources the app uses to process requests and your service plan - how much hardware is devoted to your host.
- WebJobs - allow you to run an executable program and can be scheduled or triggered.
- Mobile Apps - quickly build a backend for iOS and Android apps with a SQL database, auth, push notifications, and sdk support.

## Azure Functions
- Event driven serverless architecture - for event based processing via request, timer, message, or event
- Billed for the resources you use with no reserved capacity.
- Developer provides a function with code and metadata about its triggers and bindings.
    - Triggers - define how a function is invoked
    - Bindings - provide a declarative way to connect to services from within the code
- Functions can be stateless or stateful
    - Stateless - default
    - Stateful - Durable Functions - context is passed through the function to track prior activity
- Benefits
    - No infrastructure management
    - Scalability 
    - Only pay for what you use (event and compute time)

## Azure Logic Apps
- Event driven execution of workflows that automate business scenarios and are built from predefined logic blocks.
- 200 connectors and processing blocks to connect to different services.

## Windows Virtual Desktop
- enables users to use a client hosted version of Windows from any location, most OS, and most modern web browsers.
- Host VMs can run near apps and services reducing latency
- Security via MFA, Azure Active Directory (Azure AD), data is not stored on the local hardware reducing risk of confidential data theft.
- Benefits
    - Simplified Management with Azure Services
    - Azure Monitor for monitoring and alerts.
    - Load balancing of users on VM host pools
        - Breath mode - users are sequentially allocated across the host pool for your workload
        - Depth mode - load balancing for users are fully allocated before deploying the next
        