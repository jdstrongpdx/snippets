# Objects

## Three Ways of Creating Objects
1. Factory functions
2. Constructor functions
3. Classes

## Factory Functions
- Pros: simple syntax
- Cons: less performant, no inheritance
``` JavaScript
function gamer(name, score) {
    return {
        name: name,
        score: score,
        incrementScore() {
            this.score++
        }
    }
}
const alice = gamer('Alice', 10)
```
or using Object Property Value Shorthand
``` JavaScript
// sets key: value pairs to the same name
function gamer(name, score) {
    return {
        name,
        score,
        incrementScore() {
            this.score++
        }
    }
}
const alice = gamer('Alice', 10)
```

## Constructor Functions
- Notes: is a function, so hoisted and adds internal structure 
``` JavaScript
function Gamer(name, score) {
    this.name = name
    this.score = score
    this.incrementScore = function() {
        this.score++
    }
}
const dave = new Gamer('Dave', 0)
```

## Class Functions
- Notes: Non-hoisted, similar to constructor
``` JavaScript
class Gamer {
    constructor(name, score) {
        this.name = name
        this.score = score
    }
    
    incrementScore() {
        this.score++  
    }
}
const dave = new Gamer('Dave', 0)
```

## Using an Object in a called function - call() and apply()
- call() - method used with one argument
- apply() - method used with an array of arguments
``` JavaScript
function displayPolitician(currentSituation) {
    console.log(`${this.name} is ${this.age} years old. Current situation: ${currentSituation}.`)
}

const politician1 = {
  name: 'Carly Fowler',
  age: 40
}

displayPolitician.call(politician1, 'In jail for corruption')
```

## Inheritance - Prototype Chain
- Objects have reference to a prototype - base object Object
- Polymorphism - allows methods to have different implementations on different objects.  An object can override a method it inherits, adapting it for specific needs.

Inheritance with CONSTRUCTORS:
``` JavaScript 
// PARENT: Event
function Event(name, location, date) {
    this.name = name
    this.location = location
    this.date = date
}

// Set a function to the prototype of the Concert object instead of instance
Event.prototype.getDetails = function() {
    return `Event: ${this.name}, Location: ${this.location}, Date: ${this.date}`
}

// CHILD: Concert
function Concert(name, location, date, headliner) {
    // call parent class for init
    Event.call(this, name, location, date)
    this.headliner = headliner
}

// Set Concert to inherit from the Event prototype
Concert.prototype = Object.create(Event.prototype)
// Reset the Concert constructor to Concert instead of Event
Concert.prototype.constructor = Concert

// Override the getDetails function from Event with Concert prototype definition
Concert.prototype.getDetails = function() {
    const eventBasics = Event.prototype.getDetails.call(this)
    return `${eventBasics} Headliner: ${this.headliner}`
}

const concert = new Concert("Summer Beats", "City Stadium", "2024-07-15", "The Electrons")
const concert2 = new Concert("Happy days", "Highlands Park", "2024-08-08", "Dave Notes")
const concert3 = new Concert("Lush Vibes", "Wembley", "2024-03-08", "Si Twig")
```

Inheritance with CLASSES:
``` JavaScript
class Event {
    constructor(name, location, date) {
        this.name = name
        this.location = location
        this.date = date
    }

    getDetails() {
        return `Event: ${this.name}, Location: ${this.location}, Date: ${this.date}`
    }
}

class Concert extends Event {
    constructor(name, location, date, headliner) {
        super(name, location, date)
        this.headliner = headliner
    }
    
    getDetails() {
        const eventBasics = super.getDetails()
        return `${eventBasics} Headliner: ${this.headliner}`
    }
}

const concert = new Concert("Summer Beats", "City Stadium", "2023-07-15", "The Electrons")
console.log(concert.getDetails())
```

## Object Static Methods
Static Methods are provided by the constructor Object()
- Object.keys(obj) - returns an array of keys in the obj
- Object.values(obj) - returns an array of values in the obj
- Object.entries(obj) - returns key, value pairs in the obj
``` JavaScript
const bookEntries = Object.entries(books)
bookEntries.filter(([id, book]) => book.price > 16)
.forEach(([id, book]) => console.log(`ID: ${id} Book: ${book.title} £${book.price}`))
```
HasOwn - tests if a key exists in the object
- Object.hasOwn(obj, 'key') => returns bool

## Custom Static Class Methods
``` JavaScript
class Employee {
    // Variable of the Employee class, not instances
    static employeeCount = 0
    constructor(name) {
        this.name = name
        Employee.employeeCount++
    }
    
    static getEmployeeCount() {
        return Employee.employeeCount
    }
}

const employee1 = new Employee("Alice")
const employee2 = new Employee("Bob")
const employee3 = new Employee("Smith")
console.log(Employee.getEmployeeCount())
```

## Private Fields
Note: does not work in older browsers
Variables are bound to the class instance where they are accessible only from within the Class
``` JavaScript 
class Holiday {
    #destination
    constructor(destination, price) {
        this.#destination = destination
        this.price = price
    }
    get destination() {
        return this.#destination
    }
    set destination(newDestination) {
        if (typeof newDestination !== 'string' || newDestination.length <= 0){
            throw new Error('Destination not valid')
        }
        this.#destination = newDestination
    }
}
const safari = new Holiday('Kenya', 1000)
```

