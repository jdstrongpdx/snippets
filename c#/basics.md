# C# Basics

## Console Logging
``` C#
    Console.Write("Writes to console");
    Console.WriteLine("Adds newline");
```

## Reading from the Console
``` c#
    Console.ReadLine();
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
- Basic Data Types:
    - char
    - int
    - decimal
    - bool
    - string


## Variable Declaration Keywords
- Int, Double, String - mutable by default
- var data type (compiler infers type)
- const - used for immutable constants (except object/array interal values)
- readonly - assigned at declaration or in a constructor


## Conversion
- Implicit - automatic conversion without specific instructions - program chooses the best data type choice
- Explicit - 
1. Casting - explicitly converts one data type to another (int)doubleVal
2. Parsing - converts strings to data and vice versa int.Parse(myString)

## GetType() 
- method to discover the data type of a variable

## Implicitly Typed Local Variables
- declared with var and must be initialized

## Control Structures
``` c#
    if (condition) {
        do this...
    }
    // use break to isolate cases
    // do not use break to match multiple cases - pattern matching, or complex statements
    switch (condition) {
        case: result1:
            code;
            break;
        case: result2:
            code;
            break;
        default:
            code;
            break;
    }
```

## Loops
``` c#
    // for loop
    for (int i = 0; i < arr.Length; i++>) {
        Console.WriteLine(i);
    }

    // while loop
    while (condition) {
        // break at somepoint
    }

    // Do-While loop - for iteration that executes code at least once
    do {
        // code to execute
    } while (condition);
    // while is run after the first do iteration
```

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



## Creating sized array
``` C#
    int[] inventory = new int[3];
```