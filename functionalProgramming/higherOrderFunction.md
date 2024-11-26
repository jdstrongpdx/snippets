# Higher-order Functions

## Functions that take other functions as arguments or return them as results.

[source: YouTube Video] (https://www.youtube.com/watch?v=poQXNp9ItL4)

Examples - .map, setTimeout

``` javaScript

// INSTEAD OF:
let input = "    TextInput    "
let output = "<div>" + input.trim() + "<div>"

// FUNCTION COMPOSITION:
const trim = str => str.trim();
const wrapInDiv = str => `<div>${str}<div>`;
const toLowerCase = str => str.toLowerCase();

result = wrapInDiv(trim(toLowerCase(input)))

// Lodash - a library for FP in JS
import { compose, pipe } from 'lodash/fp';

// compose executes all the function calls
const transform = compose(wrapInDiv, toLowerCase, trim)
result = transform(input)

// pipe executes all function calls in the order listed
const transform = pipe(trim, toLowerCase, wrapInDiv)
result = transform(input)