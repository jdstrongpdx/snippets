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
- OUTER JOIN - includes rows from both left and right tables with nulls where there is no match

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

## Advanced Data Handling
- Subqueries and Common Table Expressions (CTEs)
    - Subqueries - use within clauses, to compare an expression, check values in a 1. 
    - CTE - a temporary result set that can be referenced within a SQL statement
- Filtering
    - Comparison Operators - = > <
    - Logical Operators - AND, OR
    - Pattern Matching 
        - LIKE 'John%' - % represents a wildcard for characters following John
        - IN - IN ('IT', 'Finance', 'Marketing') - finds in a list of values
    - Conditional Logic - CASE - for IF/THEN outputs 
    - Aggregate Filtering - COUNT, SUM, AVG, MIN, MAX, ADD
        - HAVING - filters based on an aggregate condition HAVING COUNT(employeeID) > 50
    - Advanced Joins, Join Filtered Data 

``` SQL
-- Subquery example -- 
SELECT songTitle FROM Songs WHERE artistID IN
(SELECT artistID FROM Artists WHERE followers > 1000000)

-- CTE example --
-- CTE finding artists with more than a million followers --
WITH PopularArtists AS
(SELECT artistID AVG (popularity) AS AvgPopularity FROM Songs
WHERE artistID in (SELECT artistID FROM Artists WHERE followers > 1000000)
GROUP BY artist_id)
-- Use of CTE in query
SELECT s.song_id FROM Songs s 
JOIN PopularArtists p ON s.artistID = p.artistID 
WHERE s.popularity >= p.AvgPopularity
```

## SQL Performance Tuning
- Query Optimization
    - SELECT - retrieve only the columns needed
    - WHERE to filter data
    - DISTINCT to avoid duplicate data - SELECT DISTINCT Category FROM Products
    - LIMIT - to reduce the result size - SELECT * FROM Products LIMIT 10
    - Use EXISTS instead of IN
    - Prefer joins over subqueries to minimize execution time.
    - Choosing the smallest applicable data type (e.g., INT instead of BIGINT where possible)
- Indexing - proper use of indexes on frequently queried columns
    - Single column index - good for a single column value like ID
    - Composite indexes - includes multiple columns
    - Create indexes on columns frequently used in search conditions (WHERE clauses) to speed up retrieval.
    - Avoid over-indexing, which can slow down data modification operations (INSERT, UPDATE, DELETE).
- Execution Plans - Reviewing execution plans helps identify inefficient operations
    - Scan efficiency - the effectiveness to scan a table to retrieve data - full table or index scan
    - Join efficiency - the effectiveness to combine data from multiple tables
        - Restructure or re-order joins to process smaller tables first 
- Database Statistics - Keeping statistics up to data aids the SQL Optimizer
- Cache and Memory Management
    - Utilize caching techniques to store frequently accessed data
    - Adjust memory allocation settings to ensure that SQL operations have sufficient resources
    - Process data in batches to prevent memory overload and enhance transaction management

## SQL Transactions using ACID
- a sequence of operations performed as a single, logical unit of work
- ACID principles
    - Atomicity - a transaction is one complete unbreakable action (either everything happens or nothing)
    - Consistency - ensures a transaction moves the database from one valid state to another following all requirements
    - Isolation - each transaction operates independent so transactions to not interfere with each other
    - Durability - complete changes are saved permanently 
- Transaction Commands
    - BEGIN TRANSACTION - starts a transaction until either commit or rollback
    - COMMIT - finalizes a transaction saving all changes to the database
    - ROLLBACK - cancels a transaction and undoes the changes

## Concurrency Control
- Concurrency problems
    - Dirty reads - one transaction reads data that has been modified by another transaction but not yet committed
    - Non-repeatable reads - a transaction modifies data in-between reads resulting in different data 
    - Phantom reads - a transaction reads a set of rows matching a condition, but later finds extra rows added by another transaction 
- Isolation Levels - different levels of isolation to prevent concurrency problems - in order of increasing performance hit
    - Read uncommitted - allows transactions to read un-committed reads (fast, but may not be accurate)
    - Read committed - allows transactions to read only committed data (prevents dirty reads)
    - Repeatable Read - reads committed data and ensures data does not change if read again
    - Serializable - treats each transaction as if it is in isolation from other transactions
Locking - locks restrict access to data allowing only certain types of operations to happen simultaneously 
    - Shared locks - allow reading, but prevent modification
    - Exclusive locks - prevent reads and modifications until the lock is released - one transaction at a time
    - Update locks - allow multiple transactions to indicate they intend to modify the data, but blocks them from making changes simultaneously

## Stored Procedures
- sets of saved SQL commands 
    - User-Defined procedures - handle specific tasks
    - Temporary-Procedures - used in a single session and discarded 
    Creation steps
        1. CREATE PROCEDURE
        2. Define Parameters
        3. Add SQL commands
        4. Declare OUTPUT - the return of the procedure
        5. Add END statement
        6. Execute using EXEC saving the OUTPUT to a variable
- Functions - sets of SQL commands that can be run as a single task
    - Scalar functions - return a single value (a number or string...)
    - Table-Valued functions - return an entire table of data
    - Creation Steps
        1. CREATE FUNCTION
        2. Define Parameters
        3. Specify return type
        4. Add function type
        5. Add END statement
        6. Execute


``` SQL
-- Stored Procedure --
DELIMITER $$
CREATE PROCEDURE IncreaseSalary (
    IN deptName VARCHAR(50),
    IN increment DECIMAL(10, 2)
)
BEGIN
    IF increment <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Increment must be positive';
    END IF;

    UPDATE Employees
    SET Salary = Salary + increment
    WHERE Department = deptName;

    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Department not found';
    END IF;
END$$
DELIMITER ;

-- Scalar Function --
DELIMITER $$
CREATE FUNCTION CalculateBonus (salary DECIMAL(10, 2))
RETURNS DECIMAL(10, 2)
DETERMINISTIC
BEGIN
    IF salary <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Salary must be positive';
    END IF;
    RETURN salary * 0.10;
END$$
DELIMITER ;

-- Table-Valued Function --
DELIMITER $$
CREATE FUNCTION GetRecentHires (hireDate DATE)
RETURNS TABLE
RETURN
    SELECT * FROM Employees WHERE HireDate > hireDate$$
DELIMITER ;

```

## SQL Security
1. Access Control
    - Authentication - verifying the users identity
    - Authorization - verifying the users access permissions with RBAC and auditing
2. Encryption
    - Data at rest - cannot be read without the encryption key
    - Data in transit - SSL, TLS
3. Secure Backups
4. Continuous Monitoring with logging 
5. Firewalls - restrict access to allowed IP addresses

## Security Threats
1. SQL Injection Attacks
    - Parametrized queries - placeholders are used for input values preventing code from being run inline
    - Input Validation - check against in input type/format/model
    - Stored Procedures - only allow specific approved queries
2. Privilege escalation - an attacker gains access to a system with higher permissions
    - Principle of least privilege (PoLP) - provides only the minimum access
3. Unauthorized access
    - Multi-factor authentication (MFA)
    - Single sign-on (SSO)
    - Role-based access control (RBAC)