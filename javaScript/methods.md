# JavaScript Methods

## Array methods
- forEach - allows you to loop over each of their members.
- filter - filters your arrays based on a specific test
- map - used to map each array item over to another array's item, based on whatever work is performed inside the function that is passed-in to the map as a parameter

``` javaScript
const veggies = ['onion', 'garlic', 'potato'];
veggies.forEach( function(veggie, index) {
    console.log(`${index}. ${veggie}`);
});

const nums = [0,10,20,30,40,50];
nums.filter( function(num) {
    return num > 20;
})

[0,10,20,30,40,50].map( function(num) {
    return num / 10
})
```

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