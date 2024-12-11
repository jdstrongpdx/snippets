# C# Classes

## Syntax
- Method Creation: 
0. ? static?
1. Access Modifier
    - public - any code can access the method
    - private - only the class itself can access the method
    - protected - accessible within the class and derived classes
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

``` c#
    // Interface that declares methods, but not implementations
public interface IPool
{
    void Info();
}

    // Base Class Creation
public class Pool : IPool
{
    public int chlorineLevel;
    public int waterLevel;
    public Pool(int chlorine, int water)
    {
        chlorineLevel = chlorine;
        waterLevel = water;
    }
    public void Info()
    {
        Console.WriteLine($"Pool: {chlorineLevel}, {waterLevel}");
    }
    // Base Class Method intended to be overridden
    public virtual void BaseClassMethod() {}
    // Base Class Method that cannot be overridden 
}

    // Inheriting class : Base Class
public class Spa : Pool
    {
    public int heatLevel;
    public Spa(int chlorine, int water, int heat)
        : base(chlorine, water)
    {
        heatLevel = heat;
    }
    // Overridden Info method
    public override void Info()
    {
        Console.WriteLine($"Spa: {chlorineLevel}, {waterLevel}, {heatLevel}");
    }
}


```