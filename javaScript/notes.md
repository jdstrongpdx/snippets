# JS Notes

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
- Variable and function declarations (not invocations/initilizaitons) are moved to the top of their containing scope during complilation

## Loops
- for..of => iterstes over the values of an iterable object (Arrays, Strings) => for (let character of characters){
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


