# Advanced Patterns and Generators

# Closures
- A closure allows access to variables within the lexical scope of a function from outside the function - even after execution

``` JavaScript
function createBankAccount(name) {
  let balance = 0
  
  return {
    deposit: function(amount) {
      balance += amount
    },
    withdraw: function(amount) {
      balance -= amount
    },
    getBalance: function(){
      console.log(`${name} has £${balance} in their account`)
    }
  }
}

const daveAccount = createBankAccount('dave')
const wendyAccount = createBankAccount('wendy')

daveAccount.deposit(100)
daveAccount.withdraw(50)
wendyAccount.deposit(200)
wendyAccount.withdraw(60)
daveAccount.getBalance()
wendyAccount.getBalance()
```

# IIFE - Immediately Invoked Function Expressions
- A function that runs immediately 

``` JavaScript
// Wrapped in () and called immediately
(function() {
    const theme = localStorage.getItem('theme')
    if (theme) {
        console.log(theme)
    } else {
        console.log('light')
    }
})()
```

# Recursion
- A function calling itself 
- Process:
1. Functions are added to the call stack
2. Functions are run from the call stack
3. Functions are Unwound to return values

# Currying
- Transform a function with multiple parameters into functions with single parameters
- Useful for FP
- Useful for functions that regularly use the same values

``` JavaScript
// With Brackets
function calculateVolume(length) {
    return function(width) {
        return function(height) {
            return length * width * height
        }
    }
}
const volume = calculateVolume(2)(3)(4)

// With Arrow Function
const calculateVolume = length => width => height => length * width * height

const volume = calculateVolume(2)(3)(4)
```

``` JavaScript
// Simplify function creation by accessing default function parts
const createLogger = level => message => `[${level.toUpperCase()}] ${message}`

const infoLogger = createLogger('info')
const warnLogger = createLogger('warn')
const errorLogger = createLogger('error')
```

# Throttling & Debouncing
- Common events: Window resize, mouse over, clicks, form submit, text input
- Throttling - ensure a function is called at most once during a time period
``` JavaScript 
// With Brackets
// func loosing its context - loosing its 'this' value, so apply is needed 
function handleResize(e){
    console.log('resize happened on event: ' + e)
}

function throttle(func, delay) {
    let throttleTimeout = null
    return function() {
        if(!throttleTimeout) {
            func.apply(this, arguments)
            throttleTimeout = setTimeout(() => {
                throttleTimeout = null
            }, delay)
        } 
    }
}
const throttledHandleResize = throttle(handleResize, 1000)
window.addEventListener('resize', throttledHandleResize)
```
``` JavaScript 
// Using Arrow Functions (take this from surrounding scope) and rest (...args) parameter
function handleResize(e){
    console.log('resize happened on event: ' + e)
}

function throttle(func, delay) {
    let throttleTimeout = null
    return (...args)=> {
       if(!throttleTimeout) {
           func(...args)
           throttleTimeout = setTimeout(()=> {
               throttleTimeout = null
           }, delay)
       } 
    }

const throttledHandleResize = throttle(handleResize, 1000)
window.addEventListener('resize', throttledHandleResize)
```
- Debouncing - will delay the function call until after a time after the event (a delay must take place before function is called)

```JavaScript 
function debounce(func, delay) {
    let debounceTimer
    return (...args)=> {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(()=> {
            func(...args)
        }, delay)
    }
 
function handleInput(e) {
    console.log('Input detected from element with id ' + e.target.id)
}

document.getElementById('name-input').addEventListener('input', debounce(handleInput, 500))
```
# Generators
- functions that can produce a sequence of values over time
- Common uses: async operations, handling state, lazy evaluation

``` JavaScript
const slidesArr = [
    "1. Intro Slide",
    "2. The current situation",
    "3. Setbacks",
    "SLIDE MALFUNCTION",
    "4. Plans",
    "5. A Positive Future"
]

// NOTE: star after function declaration
function* generator(arr) {
    for (const item of arr) {
        if (item === 'SLIDE MALFUNCTION') {
            // stops the generator programmatically
            return
        } else {
            // gives the next item
            yield item
        }
    }
}

const slideGenerator = generator(slidesArr)

document.getElementById('nextSlideBtn').addEventListener('click', () => {
    // calling next on the generator function
    const result = slideGenerator.next()
    if (!result.done) {
        console.log(result.value)
    } else {
        console.log('That is the end of the presentation!')
    }
}) 
```

