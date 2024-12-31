# Azure Overview

## Advantages of Cloud Computing
- High Availability: Ensures a system or application is operational and accessible with minimal downtime.
- Scalability: The ability to handle increasing workloads by adding resources, such as more servers or storage.
- Elasticity: Dynamically adjusting resources up or down based on demand to optimize cost and performance.
- Agility: The capability to quickly adapt to changing requirements or environments in development and operations.
- Geo-distribution: Deploying applications and data across multiple geographic locations for performance, redundancy, and compliance.
- Disaster Recovery: A strategy to restore systems and data quickly after failures, ensuring business continuity.

## Types of Cloud Computing
- Public Cloud: A cloud environment where services and resources are shared among multiple users and hosted by a third-party provider, accessible over the internet.
- Private Cloud: A dedicated cloud environment used exclusively by a single organization, either hosted on-premises or by a third-party provider.
- Hybrid Cloud: A combination of public and private cloud environments that are integrated to allow data and applications to move seamlessly between them.

## Database Services
- Azure Cosmos DB: A globally distributed, multi-model NoSQL database service designed for high availability, scalability, and low latency.
- Azure SQL Database: A fully managed relational database-as-a-service (DBaaS) built on Microsoft SQL Server, ideal for modern applications requiring scalability and high availability.
- Azure SQL Managed Instance: A managed SQL Server instance providing near 100% compatibility with on-premises SQL Server for migration and hybrid scenarios.
- Azure Database for MySQL: A fully managed relational database service for MySQL, offering scalability, high availability, and security.
- Azure Database for PostgreSQL: A fully managed relational database service for PostgreSQL, supporting high availability and scalability with built-in security features.

## Data Services
- Azure Virtual Machines: Scalable, on-demand virtual servers in the cloud that allow full control of the operating system and software.
- Azure App Service: A fully managed platform for hosting web apps, RESTful APIs, and mobile backends with built-in scaling and deployment.
- Azure Container Instances (ACI): A service to quickly deploy and manage containers without managing virtual machines or orchestration.
- Azure Kubernetes Service (AKS): A managed Kubernetes service for deploying, scaling, and managing containerized applications with orchestration.
- Azure Functions: A serverless compute service for running event-driven code without managing infrastructure.
- Azure Virtual Desktop (AVD): A cloud-based service for delivering secure, virtualized Windows desktops and apps to users from any device.

## Storage Services
- Azure Blob Storage: A service for storing large amounts of unstructured data, such as text, images, videos, or backups, in the cloud.
- Azure Disk Storage: Persistent, high-performance block storage for Azure Virtual Machines, offering multiple disk types for various performance needs.
- Azure Files: A fully managed, cloud-based file-sharing service accessible via SMB or NFS protocols, suitable for applications and shared storage.
- Azure Blob Storage Tiers: Cost-effective storage options (Hot, Cool, Archive) designed for different access patterns, ranging from frequent to infrequent or archival use cases.

## Networking Services
- Azure Virtual Network (VNet): A private, isolated network in Azure that allows secure communication between Azure resources, on-premises environments, and the internet.
- Azure VPN Gateway: A service for securely connecting on-premises networks to Azure Virtual Networks over an encrypted VPN connection.
- Azure ExpressRoute: A private, dedicated connection between on-premises networks and Azure, offering higher reliability, faster speeds, and lower latencies compared to VPNs.

## Azure Architecture Components
- Management Groups: Containers that help organize and manage access, policies, and compliance for multiple Azure subscriptions.
- Subscriptions: Billing units in Azure that define access boundaries for resources and link them to a specific account for cost tracking and management.
- Resource Groups: Logical containers in Azure that group related resources (e.g., VMs, storage) for simplified management, deployment, and organization.
- Resources: Individual services or components (e.g., virtual machines, databases, storage accounts) deployed and managed within Azure.

## Geographic Distribution
- Azure Regions: Geographically distributed data centers in Azure, each hosting a set of resources to deliver cloud services with low latency and high availability.
- Region Pairs: Paired Azure regions within the same geographic area to provide disaster recovery and data residency, ensuring redundancy for critical services.
- Availability Zones: Physically separated locations within an Azure region, providing high availability and fault tolerance by isolating resources across data centers.

## AI Solutions
- **Azure Bot Service**: A managed platform for building, deploying, and scaling intelligent bots using AI services and frameworks.
- **Azure Cognitive Services**: A suite of pre-built APIs and tools for adding AI capabilities like vision, speech, language, and decision-making to applications.
- **Azure Machine Learning**: A cloud service that provides tools for building, training, and deploying machine learning models at scale.

## Development Tools
- **Azure DevOps Services**: A set of development tools for version control, project management, testing, and CI/CD to streamline software development.
- **GitHub**: A platform for version control and collaboration that allows developers to work together on projects, integrated with Azure for deployment and automation.
- **Azure DevTest Labs**: A service to quickly create, manage, and tear down test environments, optimizing the use of resources for development and testing.

## Azure Monitoring Services
- **Azure Advisor**: A personalized recommendation service that provides best practices to optimize Azure deployments for cost, performance, and security.
- **Azure Monitor**: A platform for collecting, analyzing, and acting on telemetry data from Azure resources to monitor application and infrastructure health.
- **Azure Service Health**: A service that provides personalized alerts and guidance for Azure service issues, planned maintenance, and health advisories.

## Azure Serverless Technologies
- **Azure Functions**: A serverless compute service that allows you to run event-driven code without managing infrastructure.
- **Azure Logic Apps**: A serverless integration service that automates workflows between different apps and services in the cloud.

## Azure IoT
- **Azure IoT Hub**: A cloud platform that connects, monitors, and manages IoT devices at scale.
- **Azure IoT Central**: A fully managed IoT app platform that simplifies building, deploying, and managing IoT solutions.
- **Azure Sphere**: A secure, end-to-end IoT platform that combines hardware, OS, and cloud security to protect devices from cybersecurity threats.

## Azure Security
- **Azure Security Center**: A unified security management system that provides threat protection and security posture management for Azure resources.
- **Azure Sentinel**: A cloud-native SIEM (Security Information and Event Management) system that uses AI to provide intelligent security analytics.
- **Azure Key Vault**: A service for securely storing and managing sensitive data such as keys, secrets, and certificates.
- **Azure Dedicated Host**: A physical server dedicated to your workloads for more control over hardware and compliance needs.

## Azure Network Security
- **Azure Firewall**: A managed, stateful network security service that protects Azure Virtual Networks by filtering traffic.
- **Azure Virtual Network**: A private network that connects Azure resources and enables secure communication between them.
    - **Network Security Groups**: A tool to control inbound and outbound traffic to Azure resources based on security rules.
    - **DDoS Protection**: A service that helps protect against Distributed Denial of Service (DDoS) attacks on Azure resources.

