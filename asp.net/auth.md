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
- common elements
    - sub - subscriber/id
    - name - username
    - iat - issued at time
    - exp - expiration time
    - aud - audience
    - iss - issuer
    - scope - scope for the jwt
    - role - user roles
    - claim - user claims

## JWT Authentication
1. User Login
2. Token Creation
3. API request is included with requests
4. Token Validation (Middleware)
    - Middleware - checks users with valid tokens and roles
    - Bearer schema - request is sent with a Bearer JWT
    - Securing API routes based on Roles or Claims (Key: Value)
    

## JWT Best Practices
- Safety
    1. Token expiration - 15 to 60 minutes for standard token (or shorter)
    2. Refresh tokens - clients can renew JWT without re-authentication 
    3. Store tokens in HTTP-Only cookies to prevent XSS attacks
    4. Refresh tokens should have the minimum permissions (no roles/claims)
    5. Secure signing algorithms (SHA256)
    6. Keep secret key safe (environment variables or Key Vault)
    7. Encrypt JWT claims for private data
- Performance
    1. Use caching for token validation
    2. Reduce token size using only essential data


## Example JWT Setup Code 
``` C#
    // Program.cs
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;
    using System.Text;

    var builder = WebApplication.CreateBuilder(args);

    var secretKey = "SuperSecretKeyForJwtTokenAuthorization123456789"; // Use an environment variable in production
    var key = Encoding.ASCII.GetBytes(secretKey);

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ClockSkew = TimeSpan.Zero // Default is 5 minutes
        };
    });

    builder.Services.AddControllers();

    var app = builder.Build();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.Run();

    // AuthController.cs
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.IdentityModel.Tokens;

    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private static readonly Dictionary<string, string> Users =
            new() { { "user1", "password1" }, { "admin", "password2" } };

        private readonly string secretKey = "SuperSecretKeyForJwtTokenAuthorization123456789";
        private static readonly Dictionary<string, string> RefreshTokens = new();

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (!Users.TryGetValue(request.Username, out var password) || password != request.Password)
                return Unauthorized();

            var accessToken = GenerateAccessToken(request.Username);
            var refreshToken = GenerateRefreshToken();

            // Store the refresh token
            RefreshTokens[refreshToken] = request.Username;

            return Ok(new { AccessToken = accessToken, RefreshToken = refreshToken });
        }

        [HttpPost("refresh")]
        public IActionResult Refresh([FromBody] RefreshTokenRequest request)
        {
            if (!RefreshTokens.TryGetValue(request.RefreshToken, out var username))
                return Unauthorized("Invalid refresh token.");

            // Invalidate the old refresh token
            RefreshTokens.Remove(request.RefreshToken);

            // Generate a new access token and refresh token
            var newAccessToken = GenerateAccessToken(username);
            var newRefreshToken = GenerateRefreshToken();

            // Store the new refresh token
            RefreshTokens[newRefreshToken] = username;

            return Ok(new { AccessToken = newAccessToken, RefreshToken = newRefreshToken });
        }

        private string GenerateAccessToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }),
                Expires = DateTime.UtcNow.AddMinutes(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                ),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RefreshTokenRequest
    {
        public string RefreshToken { get; set; }
    }

    // SecureController.cs
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    [ApiController]
    [Route("api/secure")]
    public class SecureController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public IActionResult GetSecureData()
        {
            return Ok(new { Message = "This is a secure endpoint." });
        }
    }
```