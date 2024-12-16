# Entity Framework

## Structure
Entity Framework Core (EF Core) is an object-relational mapper (ORM). An ORM provides a layer between the domain model that you implement in code and a database. EF Core is a data access API that allows you to interact with the database by using .NET plain old Common Runtime Language (CLR) objects (POCOs) and the strongly typed Language Integrated Query (LINQ) syntax.

Database => Database Provider => EF Core Provider => DBContext => DbSet<T>

``` bash
# Install packages from 
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet tool install --global dotnet-ef
```

// See documentation or learning example for DB syntax and operations
https://learn.microsoft.com/en-us/training/modules/persist-data-ef-core/


``` bash
    # Create data migration files
    dotnet ef migrations add InitialCreate --context PizzaContext
    # Apply the migration files
    dotnet ef database update --context PizzaContext

    # AFTER CHANGING THE MODEL
    # Regenerate the migration files
    dotnet ef migrations add ModelRevisions --context PizzaContext
    # Apply the migration files
    dotnet ef database update --context PizzaContext
    ```

