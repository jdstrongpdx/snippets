# ASP.NET Middleware
Enables additional request processing across different parts of our app instead of a single endpoint

## Built-in Middleware Components
- Authentication - UseAuthentication()
- Routing - UseRouting()
- Logging
- Error Handling

## Configuration
- startup.cs - configures the middleware and services

``` c#
    // DevEnv Error Handling
    app.UseDeveloperExceptionPage();
    // Production Error handling
    app.UseExceptionHandler("route/to/error/path");

    // Authentication
    // checks if logged in or not
    app.UseAuthentication();

    // Authorization
    // checks if they have permission to access resources
    app.UseAuthorization();

    // Logging
    builder.Services.AddHttpLogging(o=>{});
    app.UseHttpLogging();
    // You also need to modify your app settings.json file by adding the logging level:
    "Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware" : "Information"

```

## Pipeline
1. Incoming Request
2. Logging (user activity and resource being accessed)
3. Authentication 
4. Application logic middleware (performing controller task)
5. Response generation

## Custom Middleware
- context - stores information about the request and response
- next - request delegate for the next task in the pipeline
``` c#
// CUSTOM MIDDLEWARE Example
app.Use( async (context, next) => {
    // Logic before endpoint call
    await next.Invoke(); // call the endpoint function
    // Logic after endpoint call
})

// chain multiple app.Use here to define custom behavior

// use middleware when... ex. api key is required for !GET
app.UseWhen(
    context => context.Request.Method != 'GET',
    appBuilder => appBuilder.Use(async (context, next) => {
        var extractedPassword = context.Request.Headers["X-API-Key"];
        if (extractedPassword == "passwordFromEnvFile") {
            await next.Invoke();
        } else {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Invalid API Key")
        }
    })
)

```

## Logging
Logging - the process of recording messages or data about an application or systems behavior.
- Issue diagnosis - see details about errors
- Performance monitoring
- Security auditing 
- Error tracking
- User behavior analysis

## Logging Best Practices
- Use the right level of detail 
- Use consistent formatting 
- Log scopes - organize and group related logs with extra information

``` c#
// Logging Example
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.All;
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
});

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

var app = builder.Build();


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
} else {
    app.UseDeveloperExceptionPage();
}
```

## Logging Providers
Built-in
- Console
- Debug - sends log messages to debugging environment
- Eventlog - writes logs to the window event log (Windows)

Third-party logging
- Serilog - detailed, context-rich logging
- NLog - better performance and ease of configuration

Analyzing log data
- ElastiSearch
- Logstash

## Configuring Logging
1. Define the log output locations
2. Set log levels
3. Configure in appsettings.json or Program.cs
4. Install third-party frameworks
5. Create and save logs
6. Test and verify logs are working correctly

## Dependency Injection
- Dependency - an external object or service that a class or function relies on to perform its tasks
- Dependency injection - a design pattern in which objects receive their dependencies from an external source rather than creating them internally
- If we create an instance of the service in our class we
    - tightly couple a specific service to our class
    - make it more difficult to maintain across the whole app
    - create multiple instances of the same service with performance impacts
- What we want is loose coupling using an interface defining the service instead of the service itself

``` c#
    // CREATING A SERVICE

    // Define the interface
    public interface IMyService
    {
        void LogCreation(string message);
    }

    // Define a class that implements the interface
    public class MyService : IMyService
    {
        // instance variable
        private readonly int _serviceId;

        // class constructor
        public MyService()
        {
            _serviceId = new Random().Next(1000000, 999999);
        }

        // class method
        public void LogCreation(string message){
            Console.WriteLine($"{message} - Service ID: {_serviceId}");
        }
    }

    // adding a service as a singleton
    builder.Services.AddSingleton<IMyService, MyService()>;
    // OR creating a new service instance for each request
    builder.Services.AddScoped<IMyService, MyService()>;
    // OR creating a new instance each time the service is requested
    builder.Services.AddTransient<IMyService, MyService()>;

    // use the service in the route
    app.MapGet("/", (IMyService myService) => {
        myService.LogCreation("Root");
        return Results.OK("Check console for creation log")
    })
```

## Unit Testing for code with DI
- Mocking - creating simulated objects or services that replicate the behavior of real ones to isolate and test specific components
1. Setup the test environment by configuring your component to use Mock services instead of real ones
2. Configure a Mocking framework to simulate the external service
    1. Install the mocking framework
    2. Configure the mock service
    3. Simulate the behavior of the external service
    4. Inject the mock service into the component
    5. Run the component with the mock service
3. Write the unit test
    1. Define the output conditions
    2. Call the method on the component
    3. Verify the component's output matches what was expected
    4. Use a test runner to execute the test

## Using Global Exception Handling
1. Add Global Exception Handling Middleware
2. Use a Try-Catch block to catch any exceptions

``` c#
    app.Use(async (context, next) => 
    {
        try
        {
            // try calling the route function
            await next.Invoke();
        }
        // catch any exception or specific ones
        catch (Exception ex)
        {
            // log, return error message, ect...
            {ex.Message} // the exception message
        }
    })

    // For more descriptive information, attach to the controller request
        app.MapGet("/blogs/{id}", Results<OK<Blog>>, NotFound> (int id) => {
        if (id < 0 || id >= blogs.Count) {
            return TypedResults.NotFound();
        } else {
            return TypedResults.OK(blogs[id]);
        }
    }).WithOpenApi(operation => {
        operation.Parameters[0].Description = "First parameter description";
        operation.Summary = "Summary of route";
        operation.Description = "Detailed description of the route";
        return operation;
    });
```

## OpenAPI 
- A specification that documents how API's function - what valid requests and responses are.
- Swagger - turns the OpenAPI documentation into an interactive solution for developers to explore the API.
- Swashbuckle a namespace that contains Swagger in .NET
- ! Incorrect documentation is worse than no documentation !

``` c#
    // install Microsoft.AspNetCore.OpenAPI & Swashbuckle.AspNetCore
    builder.Services.AddEndpointExplorer();
    builder.Services.AddSwaggerGen();

    if (app.Environment.IsDevelopment()) {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
```

## Middleware Best Practices
1. Set Up Lightweight Middleware: Design each middleware to handle only quick tasks like logging or routing. Offload complex operations to background services to avoid delays and keep middleware responsive.

2. Implement Short-Circuiting: Configure middleware to terminate requests early when conditions aren’t met, such as ending the pipeline on failed authentication. This prevents unnecessary processing.

3. Centralize Error Handling: Set up one error-handling middleware to manage exceptions, reduce repetitive code, and speed up request handling.

4. Enable Asynchronous Operations: Use asynchronous patterns within middleware to handle requests without blocking, keeping other requests moving efficiently under heavy load.

5. Leverage Built-In Middleware: Use ASP.NET Core’s built-in middleware for tasks like compression and logging. These components are optimized for performance, saving development time and ensuring efficiency.

6. Order Middleware Strategically: Critical checks, such as authentication, should be placed early in the pipeline to prevent invalid requests from reaching more intensive components.

7. Combine Middleware Where Possible: Combining similar tasks reduces the number of middleware components. This minimizes the time spent processing and simplifies the request pipeline.

## Security Best Practices
1. Validate and Sanitize Inputs: Apply input validation to ensure data is correctly formatted and sanitized to strip harmful content, preventing injections and malicious scripts.

2. Enforce HTTPS for Secure Communication: Add app.UseHttpsRedirection() in your middleware setup to enforce HTTPS, ensuring data exchanged between users and your server is encrypted.

3. Secure Cookies and Session Data: Set cookies with HttpOnly and Secure attributes (Cookie.HttpOnly = true and Cookie.SecurePolicy = CookieSecurePolicy.Always) to prevent access by browser scripts, reducing cross-site scripting (XSS) vulnerabilities.

4. Perform Authentication and Authorization Early: Place app.UseAuthentication() and app.UseAuthorization() at the beginning of the middleware pipeline to block unauthorized access to restricted sections immediately.

5. Log Security Events Carefully: Log security events like login attempts and access denials without sensitive details. Logging tools capture basic information such as timestamps, IP addresses, and general event descriptions.

6. Handle Errors Securely: Configure error handling to display a generic message to users while logging detailed information for developers. Use ExceptionHandlerMiddleware to manage error responses without revealing technical information.

``` c#
    using System;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.Hosting;
    using Microsoft.AspNetCore.Http;
    using System.Threading.Tasks;

    var builder = WebApplication.CreateBuilder(args);

    // Configure to listen on HTTP only for simplicity
    builder.WebHost.ConfigureKestrel(options =>
    {
        options.ListenLocalhost(5294); // HTTP only
    });

    var app = builder.Build();

    // Middleware to log security events if response status indicates an issue
    app.Use(async (context, next) =>
    {
        await next(); // Run the next middleware first

        if (context.Response.StatusCode >= 400)
        {
            Console.WriteLine($"Security Event: {context.Request.Path} - Status Code: {context.Response.StatusCode}");
        }
    });

    // Simulated HTTPS Enforcement Middleware
    app.Use(async (context, next) =>
    {
        // Check for a query parameter to simulate HTTPS enforcement (e.g., "?secure=true")
        if (context.Request.Query["secure"] != "true")
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync("Simulated HTTPS Required");
            return;
        }

        await next();
    });

    // Middleware for input validation
    app.Use(async (context, next) =>
    {
        var input = context.Request.Query["input"];
        if (!IsValidInput(input))
        {
            if (!context.Response.HasStarted)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Invalid Input");
            }
            return;
        }

        await next();
    });

    // Helper method for input validation
    static bool IsValidInput(string input)
    {
        // Checks for any unsafe characters or patterns, including "<script>"
        return string.IsNullOrEmpty(input) || (input.All(char.IsLetterOrDigit) && !input.Contains("<script>"));
    }

    // Middleware for short-circuiting unauthorized access
    app.Use(async (context, next) =>
    {
        if (context.Request.Path == "/unauthorized")
        {
            if (!context.Response.HasStarted)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized Access");
            }
            return; // Exit middleware pipeline early if unauthorized
        }
        await next();
    });

    // Middleware for simulated authentication and secure cookies
    app.Use(async (context, next) =>
    {
        // Simulate authentication with a query parameter (e.g., "?authenticated=true")
        var isAuthenticated = context.Request.Query["authenticated"] == "true";
        if (!isAuthenticated)
        {
            if (!context.Response.HasStarted)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Access Denied");
            }
            return;
        }

        context.Response.Cookies.Append("SecureCookie", "SecureData", new CookieOptions
        {
            HttpOnly = true,
            Secure = true
        });

        await next();
    });

    // Middleware for asynchronous processing
    app.Use(async (context, next) =>
    {
        await Task.Delay(100); // Simulate async operation
        if (!context.Response.HasStarted)
        {
            await context.Response.WriteAsync("Processed Asynchronously\n");
        }
        await next();
    });

    // Final Response Middleware
    app.Run(async (context) =>
    {
        if (!context.Response.HasStarted)
        {
            await context.Response.WriteAsync("Final Response from Application\n");
        }
    });

    app.Run();
```