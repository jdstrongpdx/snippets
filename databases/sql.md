# SQL Overview

## SQL Queries
- Keywords aka Statements, Commands - reserved words that perform a function (SELECT, INSERT)
- Clauses - specify operations or conditions (FROM)
- Expressions - combinations of values, operators, and functions that evaluate to a single value (WHERE)

## Common SQL Statements
- SELECT - SELECT * FROM Employees
- SET - UPDATE UserProfiles SET Address = '123 Elm Street', PhoneNumber = '555-1234' WHERE UserId = 101;
- INSERT INTO - INSERT INTO Employees (Name, Department) VALUES ('John Doe', 'Sales')
- UPDATE - UPDATE Employees SET Salary = 50000 WHERE Name = 'John Doe'
- DELETE - DELETE FROM Employees WHERE Department = 'Sales'
- WHERE - SELECT * FROM Employees WHERE Department = 'Marketing'
- TOP - SELECT TOP 5 * FROM Employees ORDER BY Salary DESC
- ORDER BY - ORDER BY column_name ASC/DESC
- JOIN - SELECT Employees.Name, Departments.Department FROM Employees JOIN Departments ON Employees.DepartmentID = Departments.ID
- ROLLBACK - Undo changes from last query

- INNER JOIN (most common) - returns only rows where there is a match in both tables
- LEFT JOIN - returns all the rows from the left tables and the matching rows from the right table.
- RIGHT JOIN - returns all the rows from the right tables and the matching rows from the left table.
- OUTER JOIN - inculdes rows from both left and right tables with nulls where there is no match

## SQL Functions
- predefined operations that allow you to perform specific tasks on your data
- CONCAT - join multiple strings into one - SELECT CONCAT(FirstName, ' ', LastName) AS FullName FROM Employees
- LEN - count the length of a string - SELECT LEN(FirstName) AS FirstNameLength FROM Employees
- UPPER - convert a string to uppercase - SELECT UPPER(Department) AS UpperDepartment FROM Employees
- LOWER - convert a string to lowercase - SELECT LOWER(LastName) AS LowerLastName FROM Employees
- SUBSTRING - extract part of a string - SELECT SUBSTRING(LastName, 1, 3) AS LastNameSnippet FROM Employees

## Aggreatation Functions
- COUNT - SELECT COUNT(*) AS TotalEmployees FROM Employees
- SUM - SELECT SUM(Salary) AS TotalSalary FROM Employees
- AVG - SELECT AVG(Salary) AS AvgEngineeringSalary FROM Employees WHERE Department = 'Engineering'
- MIN - SELECT MIN(Salary) AS MinSalary FROM Employees
- MAX - SELECT MAX(Salary) AS MaxSalesSalary FROM Employees WHERE Department = 'Sales'
- GROUP BY - SELECT YEAR(HireDate) AS HireYear, COUNT(*) AS EmployeeCount FROM Employees GROUP BY HireYear