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

``` C#
    // in-memory user Auth template using Razor pages

    // ApplicationDbContext.cs
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }

    // Program.cs
    using Microsoft.EntityFrameworkCore;

    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddControllersWithViews();

    // Configure in-memory database
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseInMemoryDatabase("InMemoryUserAuthApp"));

    // Add Identity
    builder.Services.AddDefaultIdentity<IdentityUser>()
        .AddEntityFrameworkStores<ApplicationDbContext>();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler("/Home/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();

    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
    app.MapRazorPages();

    app.Run();

    // RegisterViewModel.cs
    using System.ComponentModel.DataAnnotations;
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

    // AccountController.cs
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new IdentityUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return RedirectToAction("Login");
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }
            return View(model);
        }


        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", "Invalid login attempt.");
            }
            return View(model);
        }
    }

    // Shared/Register.cshtml
    @model RegisterViewModel

    <form asp-action="Register" method="post">
        <div>
            <label>Email</label>
            <input asp-for="Email" />
        </div>
        <div>
            <label>Password</label>
            <input asp-for="Password" type="password" />
        </div>
        <button type="submit">Register</button>
    </form>

    // LoginViewModel.cs
    using System.ComponentModel.DataAnnotations;
    public class LoginViewModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }

    // Shared/Login.cshtml
    @model LoginViewModel

    <form asp-action="Login" method="post">
        <div>
            <label>Email</label>
            <input asp-for="Email" />
        </div>
        <div>
            <label>Password</label>
            <input asp-for="Password" type="password" />
        </div>
        <div>
            <label>Remember Me</label>
            <input asp-for="RememberMe" type="checkbox" />
        </div>
        <button type="submit">Login</button>
    </form>
```