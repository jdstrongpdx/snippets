# C# Classes

## Syntax
- Method Creation: 
0. ? static?
1. Access Modifier
    - public - any code can access the method
    - private - only the class iteself can access the method
    - protected - 
    - internal - 
2. Return Type
3. Method Name
4. Parameters

``` C#
    public int FooBar(int a, int b) {
        // function
    }

    public List<int> BarFizz(List<int> nums) {
        // function
    }
```

## Methods

``` C#
using System;

public class Program
{

	public static void Main() {
		// Method Definition
		static void GreetUser(string name) {
			Console.WriteLine("Hello " + name + "!");
		}

		// Call the method
		GreetUser("Alice");

	}
}
```

OOP
- Encapsulation - protecting the internal state (via access modifiers)
- Abstraction - simplifying complexity
    - Abstract classes - define common code and methods
    - Interfaces - define a contract specifying what methods a class must implement without specifying the details
- Inheritance - children inherit the functonality from the parents and can extend over override them.
- Polymorphism - uses a single method name to perform different tasks based on the type of object it is acting upon
