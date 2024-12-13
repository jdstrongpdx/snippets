# .NET Basics

## Ecosystem
- Cross-platform
- Supports multiple languages
- Framework Class Library 
- ASP.NET core for web development
- Blazor - web assembly can run code in the browser

## Workflow
1. Setup Project
2. Manage Libraries
3. Repository - track changes
4. Dev Server - locally serve content
5. Write Code
6. Test
7. Deploy

## Install
- Download .NET SDK for your OS
- dotnet --version to check install

## Create Project
``` c#
    // create a new project - enter in the command palette
    .net new project
    // create a new console program from the terminal
    dotnet new console -o directory
    // build the program
    dotnet build
    // run the program
    dotnet run
    dotnet run .\Program.cs
    // clean the build dir (bin)
    dotnet clean
    // add a package from NuGet package manager
    dotnet add package .packageName.
```
## Configure Project
- *.csproj - the project configuration in xml (like application.properties)
- nuget - the package manager (like maven/gradle)
- in the command pallet 

## Organization
- Project.cs is the default entry point (can be changed)
- .csproj is the project configuration file
- bin dir stores built binary files
- obj dir stores intermediate build files needed to compile
- Separation of Concerns - keep files of similar nature together
- \src is the root directory
- File Naming
    - PascalCase  is used for class names, methods and properties.
    - camelCase is used for private fields, method parameters and local variables
    - descriptive file names 
- Documentation
    - include a Readme.md file
    - comment when necessary and add decision explinations

## .NET History
- .NET Framework was released in 2002
- .NET Core was released on 2016 focusing on cross-platform support, modular architecture, and cloud support
- Unified .NET 5 was released in 2020 to combine Framework, Xamarin (Mobile), and Core
- .NET 8 was released in 2023 and included Ahead-Of-Time compilation leading smaller, faster applications
- Limitations - only runs on Windows OS, monolithic, lacks performance optimizations

## .NET Framework
- Common Language Runtime (CLR) allows code written in multiple languages to run as a single program
- Base Class Library (BCL) provides a standard collection of classes, interfaces and value types for .NET development

## .NET Platform
- combined name for Core, Xamarin and Framework
- cross-platform
- controlled open-source
- cloud services optimized

## NuGet - Package Manager
- Semantic Versioning - Major.Minor.Patch
- Major changes are breaking changes for some features
- Commonly used libraries
    - Newtonsoft.Json - JSON parsing, de/serialization
    - Dapper - lightweight, fast ORM for SQL
    - Serilog - logging for errors, monitoring, log routing

``` c#
using System;
using Newtonsoft.Json;
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}
public class Program
{
    public static void Main()
    {
        // Deserialize JSON to Person object
        string json = "{\"Name\": \"John Doe\", \"Age\": 30}";
        Person person = JsonConvert.DeserializeObject<Person>(json);
        Console.WriteLine($"Name: {person.Name}, Age: {person.Age}");
        // Serialize Person object to JSON
        Person newPerson = new Person { Name = "Ping Jeong", Age = 25 };
        string newJson = JsonConvert.SerializeObject(newPerson);
        Console.WriteLine($"Serialized JSON: {newJson}");
    }
}
```