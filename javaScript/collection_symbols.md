# Collections and Symbols
- Symbols: used to represent unique values that can used as identifiers or keys in objects.
- Map: an object where any data type can be used as a key
- Set: classic sets

# Symbols
- a primitive data type
- an immutable identifier used as a property key
- each symbol is unique
- (similar to UUID/GUID)
- commonly used to add a unique identifier to data not "owned" by our program, but should be tracked
- symbols are not private
- misuse can add complexity and difficulty to debug

``` JavaScript
// add a hidden property to the object
const book = {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951
}

const librarianNote = Symbol()
book[librarianNote] = 'This title has gone missing'

console.log(book[librarianNote])
```

## Map Object
- holds key/value pairs
- keys can be any object vs only strings & symbols
- iterable with forEach
- Insertion Order - returns in order inserted
- common methods - size, get, set, delete

``` JavaScript
const athlete1 = { name: "Alice", age: "50" }
const athlete2 = { name: "Dave", age: "51" }
const athlete3 = { name: "Nicky", age: "49" }

const finishers = new Map()

finishers.set(athlete1, 10000)
finishers.set(athlete2, 10200)
finishers.set(athlete3, 9800)

finishers.forEach((value, key)=> console.log(key.name, value))
```

## Set Object
- stores unique values as individual items (no duplicates)
- can be used for set operations or removing duplicates
- methods => forEach, add, delete, has, clear
- set methods - exist but browser support is limited

``` JavaScript
// Array
const wishListArr = ['shoes', 'after shave', 'tesla', 'after shave', 'shoes']

// Remove duplicates and return array
const wishListSet = Array.from(new Set(wishListArr))

wishListSet.forEach((listItem) => console.log(listItem))
```