# Security and Authentication using ASP.NET Identity

## Essential Elements of Secure Backend Coding
1. Input validation (sanitization)
2. Parameterized queries (SQL injection protection)
3. Authentication
4. Authorization with RBAC
5. Vulnerabilities (XSS - cross-site scripting attacks)

## ASP.NET Identity
- Authentication (AuthN) - verifies users identities
- Authorization (AuthZ) - controls what a user can do once authenticated
- User Roles - groups of permissions assigned to users
- Authentication support
    - MFA
    - Password Recovery and Reset
    - Email Confirmation (email account is valid)
    - Integration (Google/Facebook/etc)
    - Data Storage 

## ASP.NET Architecture
- UserManager - class that manages user accounts (users, passwords, and user claims)
- SignInManager - class that manages user Auth (signin and signout)
- RoleManager - class that manages user roles
- IdentityDbContext - securely stores and retrieves user information on a database

## User Registration Process
1. Form Submission
2. Password Hashing
3. Email Confirmation (verify valid emails)
4. Data Storage

## User Authentication Process
1. Credential Submission (username and password)
2. Password Verification (hashed password is compared against saved hash)
3. Session Creation (JWT expiration)
4. Cookies (save JWT for refresh token access)

## Role-Based Access Control (RBAC)
- Roles: assigned via the RoleManager class with role permissions saved using IdentityDbContext to a table
- Claim: Name-value pairs that represent an attribute of a user or entity
- Claim-Based Authorization: access to resources or applications is determine by evaluating the claims associated with the user's identity
- Authorization Policies: Rules that determine who can access certain areas of the system
- Roles vs Claims:
    - Roles: Broad access definitions
    - Claims: Fine grained access to specific areas/departments/features

## Ways to issue Authorization
- Roles and Claims
- Cookie vs Token Auth

## External Auth Providers
- OAuth 2.0 - manages what users can DO
- OpenId Connect (ODIC) - manages who users ARE - an identity layer built on top of OAuth 2.0 to authenticate a user's identity

## JWT's
- encoded in base64 url encoding
- header - contains 'alg' for algorithm type and 'typ' for JWT type
- payload - information about the token (id, username, roles, exp)
- signature - "hash" of the header, payload, and secret key


## See documentation or class content for usage examples