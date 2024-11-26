# TypeScript overview

Statically typed. You can define variable types at compile-time, helping to catch type-related errors early.
Supports type annotations for variables, function parameters, return types, and object shapes.
Supports interfaces and type aliases, allowing you to define object shapes and enforce structure.

``` typeScript
interface Person {
  name: string;
  age: number;
}
// alias
const person: Person = { name: "Alice", age: 30 };
``` 

Errors are caught at compile-time, providing better tools for debugging and maintaining code.
Supports enums and tuples, making it easier to represent and work with specific sets of values.
``` typeScript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
``` 

Supports type inference, allowing the compiler to automatically determine the type of a variable based on its value.


Example React-TypeScript Component
``` typeScript
import React, { FC } from 'react';

interface Props {
  message: string;
}

const HelloWorld: FC<Props> = ({ message }) => {
  return <h1>{message}</h1>;
};

export default HelloWorld;
```