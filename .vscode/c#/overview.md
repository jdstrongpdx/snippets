# C# Overview

## Console Logging
``` C#
    Console.Write("Writes to console");
    Console.WriteLine("Adds newline");
```

## Literals
- Character literal - 'a'
- String literal - "string"
- Integer literal - whole numbers
- Float literal - 6-9 digits - append f or F
- Double literal (default) - 15-17 digits append nothing
- Decimal literal - 28-29 digits - append m or M
- Boolean literal - true or false

## Variables
- use camelCase
- Types:
    - char
    - int
    - decimal
    - bool
    - string

## Implicitly Typed Local Variables
- declared with var and must be initialized

## String Formatting
- escape character \
- Verbatim String Literal - uses @ symbol before quotation marks 
    - @"Literal Text"
- Unicode characters - use \u before char code
    - "\u3053"

## String Interpolation
- using named variables in the string
    - string message = $"{greeting} {firstName}!";

## Division of Literal Decimals
- !!! at least one number must use a data type that supports fractional digits
- you can cast the type in the equation
``` C#
    int first = 7;
    int second = 5;
    decimal quotient = first / (decimal)second;
```

## Compound assignment operators
- supports +=, -=, *=, ++, and --
- supports increment/decrement before and after a value

## Creating Program Commands
``` C#
    // create a new console program
    dotnet new console -o directory
    // edit code and save
    // compile 
    dotnet build
    // run
    dotnet run
```

## Creating sized array
``` C#
    int[] inventory = new int[3];
```

## Iteration
``` C#
    foreach (int items in inventory)
```