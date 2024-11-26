# javaScript Overview

## Delay Functions
- setTimeout(func, ms, params)
- const timer = setInterval(func, ms, param)
- clearTimeout(timer)

## Event Loop
1. Code => Call Stack
2. Call Stack is executed or pushed to WebAPI
3. WebAPI completes (timer, async...) => Task Queue
4. Task Queue => pushes to Call Stack for execution


## Performance Timer
1. const start = performance.now()
2. // something happens here...
3. const end = performance.now()
4. const time = end - start

## Incrementors
- ++preIncrement
- increment++

## Numeric Separator & Max Integer Size
- 9_007_199_254_740_991 instead of 9007199254740991
- to store a larger number... use BigInt
- 9_007_199_254_740_991n or BigInt(9_007_199_254_740_991)
- BigInt looses math functionality an is normally used for Cryptography or DB access with large Ids

## Hoisting 
- Variable and function declarations (not invocations/initializations) are moved to the top of their containing scope during compilation

## Loops
- for..of => iterates over the values of an iterable object (Arrays, Strings) => for (let character of characters){
- for..in => iterates over all enumerable property keys of an object (Objects) => for (let character in characters)
- forEach() => iterates over an Array - does not return anything => characters.forEach((character, index) => console.log(index, character))
- includes() => if an array holds a given value => characters.includes('item')
- map() => returns a new array with each item modified => character.map((distance) => return distance * 1.6)
- map() function => returns the resultant array => function convert () {
    return distances.map((distance) => {
        return distance * 1.6
    })
}
- join() => concatenates elements of an array into a string => characters.join(separator)
- filter => returns a new array meeting a test => characters.filter(() => return age >= 18)
- reduce() => returns accumulated result 
``` JavaScript
const total = itemsBoughtArr.reduce((total, currentItem) => 
        total + currentItem.priceUSD, 0)
    return total
}
```
- Break and Continue
- every() => checks every value meets a conditional => 
``` JavaScript
const areAllOver10k = dailyStepsArr.every((stepCount) => {
    return stepCount >= 10000
})
```
- some() => checks at least one value meets a conditional => 
``` JavaScript
const areAllOver10k = dailyStepsArr.some((stepCount) => {
    return stepCount >= 10000
})
```
- find() => finds the first value of an item meeting a conditional, else undefined 
``` JavaScript
const invoiceOver1k = invoicesUSDArr.find((invoice) => {
    return invoice > 1000
})
```
- at() => takes a positive/negative number an returns the value at that index

## Promise example
``` JavaScript
const promise = new Promise((resolve, reject)=> {
    const success = Math.random() > 0.5
    if (success) { 
        resolve('Operation successful!')
    } else {
        reject('Operation failed.')
    }
})
```

## Logical Operators and Coalescing
- Short-circuiting with OR => truthyVal || 'default'
- Short-circuiting with OR => truthyVal && do something with truthyVal
- Nullish Coalescing => nonNullorUndefined ?? 'default' - more concise than using OR
- Optional Chaining - item?.of?.array?.checking - if any fail, is undefined


## Deep Copies
- use structuredClone() method - not supported by older browsers (IE)
const deepClonedStudentDetails = structuredClone(studentDetails)

## Object functions



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

