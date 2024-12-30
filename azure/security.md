# Azure Security

## Azure Security Services 
- Azure Security Center - strengthen and protect
- Azure Sentinel - collect and act on security data
- Azure Key Vault - secure storage and access of passwords and encryption keys 
- Manage dedicated physical servers to host Azure virtual machines


## Azure Security Center
- a monitoring service that provides visibility of your security posture across all of your services, both on Azure and on-premises.
    - monitor security settings
    - automatically apply security settings to new resources
    - provide security recommendations based on your current configurations, resources, and networks
    - continuously monitor your resources and perform automatic security assessments
    - use machine learning to detect and block Malware
    - detect and analyze potential inbound attacks and investigate threats and any post-breach activity
    - just-in-time access control for networks
- view overall regulatory compliance in one place
- Secure Score - a measurement of the organization's security posture based on security controls or groups of related security recommendations.
    - Security posture report
    - Improve your security posture 
    - Benchmarks and KPI's

## Azure Sentinel
- a Security Information and Event Management (SIEM) System for threat detection and response
    - collect cloud data across all users, devices, applications, and infrastructure
    - Comprehensive Analytics and Threat Intelligence - detect previously undetected threat
    - investigate threats using AI to examine suspicious activities
    - respond to incidents rapidly
- Connect services via standard log formats
- View an Investigation graph into suspicious events
- Use Azure Monitor Workbooks to respond to threats
    - Opens an IT ticket
    - Sends a message
    - Sends the information for review
    - Can block or ignore the alert

## Azure Key Vault
- a centralized cloud service for storing application secrets in a single central location
    - Manage Secrets - securely store, monitor, and control access to tokens, passwords, certificates, API keys, and other secrets
    - Manage encryption keys - create and control encryption keys
    - Manage SSL/TSL certificates - provision, manage, and deploy public and private certificates
    - Store secrets backed by hardware security modules (HSMs)
    - Integration with other Azure services

## Azure Dedicated Host
- run VMs on dedicated physical servers providing isolation and compliance

# Azure Network Security
- Defense in depth strategy 
    - protects information and prevent it from being stolen by those who aren't authorized to access it
    - slows the advance of an attack that aims to acquire unauthorized access to data
- Layers of depth
    - Physical security - access to hardware
    - Identity & access - user login and access controls
        - SSO, MFA, Audit Events and Changes
    - Perimeter - DDoS protection to filter large attacks
        - DDos Protection, perimeter firewalls
    - Network - limits communication between resources through segmentation and access controls
        - Limit communication, deny by default, restrict inbound internet access, limit outbound access, secure connections
    - Compute - access to VMs
        - secure access to VMs, implement endpoint protection
    - Application - free of security vulnerabilities
    - Data - access to data
        - follow regulatory requirements to ensure confidentiality, integrity, and availability of data

## Confidentiality, Integrity, and Availability (CIA)
- Confidentiality
    - Principle of least privilege to restrict access
- Integrity 
    - Prevents unauthorized changes to information when stored or in transit
    - Generate a hash of the data before sending, and verify hash after receipt to verify no changes were made
- Availability 
    - Services are functioning and can only be accessed by authorized users

## Azure Firewall
- monitors network traffic and decides to allow or block specific traffic based on a defined set of security rules
- Features
    - central location for connectivity policies
    - static public IP address for VN resources
    - Integrated with Azure Monitor for logging and monitoring
    - Application, Network, and NAT rules

## Azure DDos Protection
- Basic - traffic monitoring and real-time mitigation
- Standard - additional mitigation tuned to your network and protection against volumetric, protocol and resource-layer attacks

## Network Security Groups (NSG)
- filter network traffic to and from Azure resources within an Azure Virtual Network (similar to an internal firewall)