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


