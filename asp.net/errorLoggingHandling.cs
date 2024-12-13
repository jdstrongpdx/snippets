// ************************************************
// Controller
using Microsoft.AspNetCore.Mvc;

namespace MyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorHandlingController : ControllerBase
    {
        [HttpGet("division")]
        public IActionResult GetDivisionResult(int numerator, int denominator)
        {
            try
            {
                var result = numerator / denominator;
                return Ok(result);
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine("Error: Division by zero is not allowed.");
                return BadRequest("Cannot divide by zero.");
            }
        }
    }
}

// ************************************************
// Program.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers(); // Enables controller support

// Configure logging (optional)
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

// Configure middleware for error handling
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Global exception caught: {ex.Message}");
        context.Response.StatusCode = 500;
        await context.Response.WriteAsync("An unexpected error occurred. Please try again later.");
    }
});

// Enable routing and map controller endpoints
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Maps attribute-defined routes in controllers
});

app.Run();

// ************************************************
// appsettings.json
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers(); // Enables controller support

// Configure logging (optional)
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

// Configure middleware for error handling
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Global exception caught: {ex.Message}");
        context.Response.StatusCode = 500;
        await context.Response.WriteAsync("An unexpected error occurred. Please try again later.");
    }
});

// Enable routing and map controller endpoints
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Maps attribute-defined routes in controllers
});

app.Run();

// ************************************************
// Using Serilog in Program.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers(); // Enables controller support

// Configure logging (optional)
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

// Configure middleware for error handling
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Global exception caught: {ex.Message}");
        context.Response.StatusCode = 500;
        await context.Response.WriteAsync("An unexpected error occurred. Please try again later.");
    }
});

// Enable routing and map controller endpoints
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Maps attribute-defined routes in controllers
});

app.Run();