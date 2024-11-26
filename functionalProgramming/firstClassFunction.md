# First-class Functions	

## Functions are treated as values: they can be assigned to variables, passed as arguments, or returned from other functions.

[source: YouTube Video] (https://www.youtube.com/watch?v=poQXNp9ItL4)

``` javaScript

function sayHello() {
    return "Hello World';
}

function greet(messageFunc) {
    console.log(messageFunc())
}

greet(sayHello)