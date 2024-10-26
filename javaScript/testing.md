# JavaScript Testing

## TDD aka Red-Green Development Cycle
- Write a failing test
- Write the minimum amount of code needed to pass the test
- Run the test and verify it passes
- Occasionally refactor the code and verify tests pass

## Testing Types
- end to end (e2e) - interacting with the finished software product as a user
- integration - testing how one part of your code works with another
- unit testing - testing an individual function in isolation

## JS Testing Frameworks
- e2e - WebdriverJS, Protractor, Cypress
- integration - React Testing Library, Enzyme
- unit testing - Jest, Jasmine, Mocha, Karma, qUnit

## Testing with Jest
``` javaScript

// math.js
function add(a, b) {
    return a + b;
  }
  
  module.exports = add;


// math.test.js
const add = require('./math'); 

test('tests the function exists', () => {
  expect(add).toBeDefined()
})

test('adds 2 + 2 to equal 4', () => {
  expect(add(2, 2)).toBe(4); 
});

test('adds 1 + 2 to not equal 4', () => {
  expect(add(1, 2)).not.toBe(4); 
});

// run testing using: npm run test