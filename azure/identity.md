# Azure Identity Services
- Identity and Access Management (IAM)
- primary security boundary

## Azure Active Directory (AD)
- NOTE Active Directory is used for on-premises, Azure AD is for the cloud
- Authentication (AuthN) - process of establishing the identity of a person or service that wants to access a resource via credentials.
- Authorization (AuthZ) - verifies the level of access the person or service has to access content

- Azure AD is a cloud-based Identity and Access Management Service
    - Can access external resources such as Microsoft 365, Azure Ports, SaaS apps
    - Internal resources on your organizations network and developed Cloud apps
- Access
    - Tracks Sign-in Attempts and from approved/new devices
    - Allows control of access to applications and resources based on need
    - Allows SSO and login using existing credentials
    - Allows end users to manage their identities (password resets)
- Tenant - represents an organization in Azure AD (a dedicated Azure AD instance)
- Services
    - Authentication
        - Self-service password resets
        - MFA
        - Banned passwords lists
        - Smart lockout services
    - Single Sign On (SSO) - one identity can access multiple applications
        - Reduces password policy enforcement
        - Minimizes security risks and repeated password use
        - Improves IAM complexity
            - One ID and password
            - Simplified security model
            - User access is tied to a single identity
            - User account administration is reduced
            - Users manage their own identities
    - Multi-Factor Authentication (MFA)
        - Third form of verification (Text, Biometric, Email Code)
        - Available with Azure AD Free, Azure AD Premium, Office 365
    - Conditional Access
        - Access granted based on who and where the user is, and what device is being used
            - Block access from untrusted devices
            - User access only from managed devices
            - Require access to services
            - Require MFA
        - "What If" tool - test access
    - Application Management 
    - Device Management (device based conditional policies)

- Azure AD Connect
    - Synchronizes identities between AD and Azure AD