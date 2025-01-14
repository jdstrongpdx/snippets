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

/* 
# Install EF Core tools globally
dotnet tool install --global dotnet-ef

# Create a new console application
dotnet new console -n EFCoreModelApp
cd EFCoreModelApp

# Install EF Core SQLite and tools
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Tools

# Test the setup
dotnet run 
*/

// Employee.cs
using System;

namespace EFCoreModelApp
{
    public class Employee
    {
        public int EmployeeID { get; set; } // Primary Key
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime HireDate { get; set; }
        public int DepartmentID { get; set; } // Foreign Key
        public Department Department { get; set; } // Navigation Property
    }
}

// Department.cs
using System.Collections.Generic;

namespace EFCoreModelApp
{
    public class Department
    {
        public int DepartmentID { get; set; } // Primary Key
        public string Name { get; set; }
        public List<Employee> Employees { get; set; } // Navigation Property
    }
}

// DRDbContext.cs
using Microsoft.EntityFrameworkCore;

using EFCoreModelApp;

namespace EFCoreModelApp
{
    public class HRDbContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlite("Data Source=HRApp.db")
                .ConfigureWarnings(warnings =>
                    warnings.Ignore(RelationalEventId.PendingModelChangesWarning)
                );
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
                entity
                    .HasOne(e => e.Department)
                    .WithMany(d => d.Employees)
                    .HasForeignKey(e => e.DepartmentID);
            });

            modelBuilder.Entity<Department>().HasData(
                new Department { DepartmentID = 1, Name = "HR" },
                new Department { DepartmentID = 2, Name = "Engineering" }
            );

            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    EmployeeID = 1,
                    FirstName = "Aiko",
                    LastName = "Tanaka",
                    HireDate = DateTime.Now,
                    DepartmentID = 1
                },
                new Employee
                {
                    EmployeeID = 2,
                    FirstName = "Zainab",
                    LastName = "Al-Farsi",
                    HireDate = DateTime.Now,
                    DepartmentID = 2
                }
            );
        }
    }
}

/* # Add initial migration
dotnet ef migrations add InitialCreate

# Apply the migration to create the database
dotnet ef database update */

// Program.cs
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using EFCoreModelApp;

class Program
{
    static void Main()
    {
        using (var context = new HRDbContext())
        {
            var allEmployees = context.Employees.Include(e => e.Department).ToList();
            foreach (var emp in allEmployees)
            {
                Console.WriteLine($"{emp.FirstName} {emp.LastName} - {emp.Department?.Name ?? "N/A"}");
            }

            var hrEmployees = context.Employees
                                      .Include(e => e.Department)
                                      .Where(e => e.Department.Name == "HR")
                                      .ToList();
            Console.WriteLine("HR Department Employees:");
            foreach (var emp in hrEmployees)
            {
                Console.WriteLine($"{emp.FirstName} {emp.LastName}");
            }

            var newEmployee = new Employee
            {
                FirstName = "New",
                LastName = "Employee",
                HireDate = DateTime.Now,
                DepartmentID = 2
            };
            context.Employees.Add(newEmployee);
            context.SaveChanges();

            Console.WriteLine("New employee added.");
        }
    }
}
```