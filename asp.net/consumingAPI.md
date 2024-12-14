# Consuming an API in .NET

Traditional API calls in .NET
``` c#
    // manual way
    var httpClient = new HttpClient();
    var apiBaseUrl = "http://localhost:5170";

    // call API
    var httpResults = await httpClient.GetAsync($"{apiBaseUrl}/route");

    // handle failure
    if (httpResults.StatusCode != System.Net.HttpStatusCode.OK) {
        // failed code
        return;
    }

    // stream results
    var resultStream = await httpResults.Content.ReadAsStreamAsync();

    // optional serialization options
    var options = new System.Text.Json.JsonSerializerOptions {
        PropertyNameCaseInsensitive = true
    }

    var results = await System.Text.Json.JsonSerializer.DeserializeAsync<List<Item>>(resultStream, options);

    if (results != null) {
        foreach ( var result in results) {
            // do an action
        }
    }

    class Item {
        public required string Title {get; set;}
        public required string Body {get; set;}
    }
```

Generated API calls in .NET
- Add NSwag.CodeGeneration.CSharp package
``` c#
    // generator that runs once per API spec change
    public class SwaggerClientGenerator {
        public async Task GenerateClient() {
            var httpClient = new HttpClient();
            var swaggerJson = await httpClient.GetStringAsync("routeToSwaggerJsonDocumentation");
            var document = await OpenApiDocument.FromJsonAsync(swaggerJson);
            var settings = new CSharpClientGeneratorSettings {
                ClassName = "ResultApiClient",
                CSharpGeneratorSettings = {
                    Namespace = "ResultApi"
                }
            }
            var generator = new CSharpClientGenerator(document, settings);

            var code = generator.GenerateFile();

            await File.WriteAllTextAsync("ResultApiClient.cs", code);
        }
    }

    // to use this code once the file has been generated
    using ResultsApi;

    var httpClient = new HttpClient();
    var apiBaseUrl = "http://localhost:5170";

    var client = new ResultsApiClient(apiBaseUrl, httpClient);

    var results = await client.ResultsAllAsync();

    if (results != null) {
        foreach ( var result in results) {
            // do an action
        }
    }
```

Package Example
``` c#
    // *********************************************
    // Program.cs
    // Configure Swagger
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.DependencyInjection;

    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            var app = builder.Build();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));
            Task.Run(() => app.RunAsync());
        }
    }

    // Using the Generated Client
    Using CustomNamespace //replace with your namespace

    var httpClient = new HttpClient();
    var client = new CustomApiClient("http://localhost:5000", httpClient); //replace CustomApiClient with your class name

    var user = await client.GetUserAsync(1);
    Console.WriteLine($"Fetched User: {user}");

    // *********************************************
    // Controllers/UserController.cs
    // Setup the API Specification
    using Microsoft.AspNetCore.Mvc;

    // User model
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet("{id}")]
        [Produces("application/json")]
        public ActionResult<User> GetUser(int id)
        {
            var user = new User 
            { 
                Id = id,
                Name = $"User {id}"
            };
            
            return Ok(user);
        }
    }

    // *********************************************
    // ClientGenerator.cs
    // Generate Client Code with NSwag
    using System;
    using System.IO;
    using System.Net.Http;
    using System.Threading.Tasks;
    using NSwag;
    using NSwag.CodeGeneration.CSharp;
    public class ClientGenerator
    {
        public async Task GenerateClient()
        {
            using var httpClient = new HttpClient();
            var swaggerJson = await httpClient.GetStringAsync("http://localhost:5000/swagger/v1/swagger.json");
            var document = await OpenApiDocument.FromJsonAsync(swaggerJson);
            var settings = new CSharpClientGeneratorSettings
            {
                ClassName = "CustomApiClient",
                CSharpGeneratorSettings = { Namespace = "CustomNamespace" }
            };
            var generator = new CSharpClientGenerator(document, settings);
            var code = generator.GenerateFile();
            await File.WriteAllTextAsync("CustomApiClient.cs", code);
        }
    }


```
