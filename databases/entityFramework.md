# Entity Framework Core

## Overview
- an Object Relational Mapping (ORM) tool that convrts data between oop and relational databases
- relational database - a structured collection of data organized into tables, where each table consists of rows and columns and are connected to other tables via identifiers
- Entity Framework Core - open source ORM for .NET
- LINQ - Languate Integrated Queries - write queries in C#
- Database Migrations - databases are evolved as the code changes
- Change tracking - tracks changes to objects during their life-cycle

## Core Principles of Relational DB Design
- Relationships - how databases connect to one another
    - One-to-one
    - One-to-many
    - Many-to-many
        - Junction table - a table used connect two or more other tables
- Normalization - the process of organizing data to minimize reduncancy and improve integrity
    1. 1NF - no repeated data in the same field
    2. 2NF - no partial dependancies - attriubtes should be fully dependant on the primary key
    3. 3NF - all information in the table depends on the primary key
- Constraints - rules that ensure accuracy
    - not null - cannot be empty
    - unique 
    - check - ensure the data meets a certain criteria
    - default - assign a default

## Modeling in EF Core
- Entities - classes that define the data stored
- DbContext - manages the connction, interactions (CRUD), and change tracking between your application and the database
- Data annotations - set data configurations by field
- FluentAPI - configure complex entity behavior and relationship 
- DbSet - represents an entity class/table

## DbContext Methods
- Create: Add => SaveChanges
- Read: Find, FirstOrDefault, ToList
- Update: Read => Update => SaveChanges
- Delete: Read => Remove => SaveChanges

``` C#
// store Entity classes in the Models folder
namespace ...

public class Employee
{
    // EF Core naming conventions set ClassNameID to primary key 
    [Key] // optional key declaration
    public int EmployeeID { get; set; }
    // data annotations to set configurations for data
    [Required]
    [StringLength(50)]
    public string FirstName { get; set; }
    [Required]
    [StringLength(50)]
    public string LastName { get; set; }
    public DateTime HireDate { get; set; }

    // Foriegn Key 
    public int DepartmentID { get; set; }
    // Navigation Property - creates one-to-many relationship with Department
    public Department Department { get; set; }
}
```


``` C#
// Using Fluent API

// inherit from DbContext class
public class HRDbC
{
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Department> Departments { get; set; }

    // overriding the default model creation 
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee> (entity =>
            // Make FirstName requried and set maximum length
            entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
            entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
        )
    }
}
```