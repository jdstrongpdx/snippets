# ASP.NET Middleware
Enables additional request processing across different parts of our app instead of a single endpoint

``` c#
// CUSTOM MIDDLEWARE Example
app.Use( async (context, next) => {
    // Logic before endpoint call
    await next.Invoke(); // call the endpoint function
    // Logic after endpoint call
})
```

## Logging
Logging - the process of recording messages or data about an application or systems behavior.
- Issue diagnosis - see details about errors
- Performance monitoring
- Security auditing 
- Error tracking
- User behavior analysis

``` c#
// add logging services
builder.Services.AddHttpLogging((o)=>());
// CONFIGURE logging threshold in appsettings.json
// use logging services
app.UseHttpLogging();
```

## Logging Best Practices
- Use the right level of detail 
- Use consistent formatting 
- Log scopes - organize and group related logs with extra information

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
```