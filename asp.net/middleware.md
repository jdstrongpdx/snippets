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