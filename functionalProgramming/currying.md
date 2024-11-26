# Curring

# Take a function that takes n arguments and convert to functions with one argument

[source: YouTube Video] (https://www.youtube.com/watch?v=poQXNp9ItL4)

``` javaScript

// bracketed function
function add(a) {
    return function(b) {
        return a + b;
    }
}

// arrow function (same as above)
const add = a => b => a + b;

// usage
const result = add(1)(5)


// FUNCTION COMPOSITION:
import { pipe } from 'lodash/fp';

const trim = str => str.trim();
// USES CURRYING
const wrapWithTag = tag => str => `<${tag}>${str}<${tag}>`;
const toLowerCase = str => str.toLowerCase();

const transform = pipe(trim, toLowerCase, wrapWithTag("div"))
result = transform(input)