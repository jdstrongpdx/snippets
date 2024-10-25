# Pure Functions

## Functions that return the same output for the same input and have no side effects (do not modify external state).

## source: https://www.youtube.com/watch?v=poQXNp9ItL4

Requirements:
    No random values
    No current dates/times
    No global state (DOM, files, db, etc)
    No mutation of parameters - immutability

Benefits:
    Self-documenting code
    Easily testable
    Concurrency
    Cacheable - if an intensive function is pure, you can cache the result to save on computation

Immutability:
    Predictability - the internal values do not change mid-function call
    Change Detection - items with different memory locations are easy to track changes to each
    Concurrency - immutable objects can be run concurrently with pure functions
    Cons: Performance and Memory overhead

Immutable libraries
    Lodash
    Immutable - by Facebook
    Immer - by Mobix

``` javaScript
// Ways to copy an existing object

const person = { name: "John" };

// use Object.assign params (newObj, obj, changes) - SHALLOW COPY
const updated = Object.assign({}, person, { name: "Amy", age: 24 })

// use Spread Operator - SHALLOW COPY
const updated = {...person, name: "Amy"}


// - DEEP COPY - note does not work on older browsers
const original = { name: "Joel", hobbies: ["coding", "biking"], address: { city: "Portland" } };
const copy = structuredClone(original);

// using recursion
function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  const copy = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]); // Recursively copy
    }
  }
  return copy;
}

const original = { name: "Joel", hobbies: ["coding", "biking"], address: { city: "Portland" } };
const copy = deepCopy(original);

copy.address.city = "Seattle";
console.log(original.address.city); // "Portland"

// using Lodash
const _ = require('lodash');

const original = { name: "Joel", hobbies: ["coding", "biking"], address: { city: "Portland" } };
const copy = _.cloneDeep(original);


