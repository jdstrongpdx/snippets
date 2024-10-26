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