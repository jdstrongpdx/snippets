# javaScript Overview

## DataTypes
- String  
- Number - 64 bit float  
- Boolean  
- Null - the absence of a value  
- Undefined - a variable that has not been assigned a value  
- BigInt - Unlimited sized integer - used for large integers or cryptography
- Symbol - a unique and immutable primitive data type used to create unique identifiers for object properties, ensuring there are no  name collisions, even if different parts of the code use the same string for property names. 

## Utility Methods:
- TypeOf(var) - returns the type of the object var

## Iterable types:
- Arrays, Strings

## Strings methods:
- **charAt**
- **concat** - concatonate two strings
- **indexOf** - index of first matching character else -1
- **lastIndexOf** 
- **split**
- **toUpperCase**
- **toLowerCase**

## Math

### Constants
- **Math.PI** - pi
- **Math.E** - Euler's constant
- **Math.LN2** - logarithm of 2

### Rounding
- **ceil** - rounds up to closest integer
- **floor** - rounds down to closest integer
- **round** - rounds up from .5 else down
- **trunc** - trims decimal leaving the integer value

### Arithmetic
- **pow** - takes power of two numbers
- **sqrt** - square root
- **cbrt** - cube root
- **abs** - absolute value
- **log**, **log2**, **log10** - logs with bases
- **min** - minimum
- **max** - maximum
- **sin**, **cos**, **tan** - trig methods

## Other:
- **random** - decimal between 0 and 0.99

## Arrays
- [] - Array Literal
- new Array(length) - Array Constructor

## Methods:
- **push** - adds to the end
- **pop** - pops from the end

## Objects
- contains properties made out of key: value pairs
- {} - Object Literal
- var.property = value - dot notation to add a new property to the object
- var.["property"] = value - bracket notation to add a new property to the object
- var.func = function () {} - adding a object method 

