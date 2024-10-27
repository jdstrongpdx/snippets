# javaScript Overview

## DataTypes
- String  
- Number - 64 bit float  
- Boolean  
- Null - the absence of a value  
- Undefined - a variable that has not been assigned a value  
- BigInt - Unlimited sized integer - used for large integers or cryptography
- Symbol - a unique and immutable primitive data type used to create unique identifiers for object properties, ensuring there are no  name collisions, even if different parts of the code use the same string for property names. 

## Function Creation
``` javaScript
function(param){
    return param
}
```

## Class Creation
``` javaScript

class Person {
    constructor(name = "Tom", age = 20, energy = 100) {
        this.name = name;
        this.age = age;
        this.energy = energy;
    }
    sleep() {
        this.energy += 10;
    }
    doSomethingFun() {
        this.energy -= 10;
    }
}

class Worker extends Person {
    constructor(name, age, energy, xp = 0, hourlyWage = 10) {
        super(name, age, energy),
        this.xp = xp;
        this.hourlyWage = hourlyWage;
    }
    goToWork() {
        this.xp += 10;
    }
    sleep() {
        super.sleep();
    }
    doSomethingFun() {
        super.doSomethingFun();
    }
}

function intern() {
    const intern = new Worker("Bob", 21, 110, 0, 10)
    intern.goToWork();
    return intern;
}

function manager() {
    const manager = new Worker("Alice", 30, 120, 100, 30);
    manager.doSomethingFun();
    return manager;
}

console.log(intern());
console.log(manager());
```

## Native Types
 Math, Date, Object, Function, Boolean, Symbol, Array, Map, Set, Promise, JSON

## Utility Methods:
- typeof(var) - returns the type of the object var

## Prototype:
- An object that allows other objects to inherit properties and methods
- Prototype can be inherited by Object.create(prototype)


## Iterable Types and Methods:
- **Types:** Arrays, Strings
- **Methods:**
- Object.keys() - keys iterator
- Object.values() - values iterator
- Object.entries() - key value pair iterator

- for in loop - iterate over the properties of
the object and its prototype
- for of loop - iterates only the objects properties

``` javaScript
// for of array
var dairy = ['cheese', 'sour cream', 'milk', 'yogurt', 'ice cream', 'milkshake']

function logDairy() {
    for (var item of dairy) {
        console.log(item);
    }
}

// for of Object only items
const animal = { canJump: true };
const bird = Object.create(animal);
bird.canFly = true;
bird.hasFeathers = true;

function birdCan() {
    for (const [key, value] of Object.entries(bird)) {
        console.log(`${key}: ${value}`);
    }
}

// for in Object with prototype items
function animalCan() {
    for (const key in bird) {
        console.log(`${key}: ${bird[key]}`);
    }
}
```

## Data Structures
- Objects - an unordered NON-iterable collection of key: value pairs. Keys can only be strings or symbols.
- Arrays - ordered iterable collection of values
- Maps - An iterable collection of key: value pairs with keys of any value. Does not have inheritance (no prototypes)
- Sets - collection of unique items

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
## DOM Manipulation and Events
``` javaScript
var h1 = document.createElement('h1')
h1.innerText = "Type into the input to make this text change"

var input = document.createElement('input')
input.setAttribute('type', 'text')

document.body.innerText = '';
document.body.appendChild(h1);
document.body.appendChild(input);

input.addEventListener('change', function() {
    h1.innerText = input.value
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

## Objects
- contains properties made out of key: value pairs
- {} - Object Literal
- var.property = value - dot notation to add a new property to the object
- var.["property"] = value - bracket notation to add a new property to the object
- var.func = function () {} - adding a object method 

