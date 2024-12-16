## ASP.Net Core
A cross-platform high-performance framework for building web APIs

## Features
- Cross platform
- Lightweight - high performance
- Modular architecture
- Dependency injection
- Routing and middleware
- Security (built in auth)
- Flexible deployment

## Program.cs
- Program entry point
- where the app's configuration, services, and host are setup
- manages program lifecycle

## Startup.cs
- The app's manager that configures middleware and services

## Simple API
- add a Controller (in the controllers directory)
- define endpoints in the Controller
- routing configuration (in Startup.cs)

## Project Creation
Example Products app
1. Create Project
```
    dotnet new webapi -n Products
```
2. Define Models - create Product class for objects used in the program in Models/Product.cs
3. Implement CRUD endpoints in Controllers/ProductController.cs
4. Test the routes work correctly


## API examples
``` c#
    // NOTE: IT IS BEST PRACTICE TO USE TypedResults CLASS FOR RETURN OBJECTS

    // with optional/default parameter
    app.MapGet("/users{id?}", (int int = 1) => $"Hello User {id}!");

    // with constraints
    app.MapGet("/products/{id: int:min(0)}", (int id) => {
        return $"Product: ID {id}";
    });

    // with query parameters
    app.MapGet("search", (string? q, page = 1) => {
        return ...
    });

    // with everything after the * being a parameter instead of route
    app.MapGet("/files/{*filePath}", (string filePath) => {
        return filepath
    });

    // conditional returns
    app.MapGet("/files/{*filePath}", (string filePath) => {
        if (filePathIsValid) {
            return Results.OK(filePath);
        }
        else
        {
            return Results.NotFound();
        }

    });

    // USING TypedResults
    app.MapGet("/blogs/{id}", Results<OK<Blog>>, NotFound> (int id) => {
        if (id < 0 || id >= blogs.Count) {
            return TypedResults.NotFound();
        } else {
            return TypedResults.OK(blogs[id]);
        }
    })
```

## Server Refresh during development
- Use CONTROL-R after changes to restart the server
```
    dotnet watch run
```

## Seeing API Return
- install Rest Client Extension
- create a file with a *.http extension
- write http method + endpoint (GET https://localhost:port)
- click the send request link
- divide requests using three hash symbols ###

``` c#
// requests.http
### Define Variables
@baseUrl = http://localhost
@port = 8080

### Example POST Request with Body
POST {{baseUrl}}:{{port}}/api/example
Content-Type: application/json

// optional body
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}

// request divider
### 

GET http://localhost:5251/search?q=findText&page=2
```

## Routing
- static routes - routes that match an exact path
- dynamic routes - routes that include a parameter used in the endpoint
- route constraints - type validation used for the parameter

## Error Handling
- Try-Catch-Finally Blocks 
- Global Exception Handling - centralized mechanism to catch and handle all unhandled exceptions that occur during runtime



