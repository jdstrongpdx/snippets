# Planning and Logic

## Principles
Core Components
- Servers
- Databases
- APIs

Principles
- Data Integrity & Security
- Performance Optimization
- Scalability

Error Handling & Reliability

## Project Planning
- Define requirements - What, for who, and why
- Setting objectives - SMART (see below)
- Creating timelines
- Identifying resources - right tools, technology and team members
- Scope - what is defined by the project and what it not

## Workflow
- Planning
- Architecture Design
- Development 
- Testing
- Deployment
- Maintenance

## SMART Goals
- Specific
- Measurable
- Achievable
- Relevant
- Time-bound
- ex. Develop and implement enhanced search functionality that reduces search time by 50% within the next six months

## Problem Solving
Logical Processes
- Sequence - the order the code is executed
- Control Structure or Conditional Statements - paths for code to follow
- Iterations - looping through a block of code
- Logical operators - boolean - AND, OR, and NOT

Deductive Reasoning
- A logical process by which conclusion are drawn from given premises
- Arguments: Premises, conclusion, supporting relation
1. Identify the premises - statements that you believe are true - should be clear, factual, and directly related to the problem you are trying to solve.
2. Analyze the premises - analyze premises to see how they relate
3. Draw a conclusion - find a direct cause-effect relationship to identify the cause of a problem based on logic
4. Test the conclusion - test your conclusion to verify it is correct.

```
Task: A year is a leap year if it is divisible by 4, but not every year divisible by 100 is a leap year unless it is also divisible by 400.
Pseudocode:
Start
Input year 
If year is divisible by 4
  Or if year is divisible by 400
    Display to user "Leap year"
  Otherwise print “Not a leap year”
End
```

## Problem Decomposition
1. Identify the problem or goal.
2. Divide the main problem into smaller more manageable parts.
  - Top-down (general problems) - aligns with deductive reasoning 
  - Modularization (complex problems) - fragment a complex issue into smaller, independent parts that each carry out a specific role
3. Analyze and address each part individually fixing bugs or implementing components.

## Top-down Approach
- Begin with a broad overview and break it down into smaller parts.
- Use when you have a clear overview and need to break down - rigid

## Bottom-up Approach
- Begin with small manageable parts and combine them to create a broad composite
- Use when you need to gather knowledge to understand the problem - exploratory, flexible

## Algorithm Structure
- Conditional Statements
- Categorical statements - group and classify data based on criteria
- Logical structures - determine boolean conditions and comparisons

## Algorithm Design
1. Understand the problem and set a goal
2. Diagramming and outlining - create steps

## Debugging
1. Examine error message
2. Reproduce and isolate the error
3. Analyze and fix the issue

## Debugging Techniques
1. Watches - watch a variable as the program is running
2. Logging - log error message for review later
3. Print statements - quick insights into the logic flow and variables
4. Breakpoints - isolate where to pause processing

## Errors
- Logic error - when the program runs but produces incorrect results
- Syntax and runtime errors - violate language rules or encounter errors during runtime.

## Design Patterns
### Creational Patterns
- Specify how developers create objects
- Objects should be created for particular scenarios
### Structural Patterns
- Specify how developers compose objects
- Organize relationships between objects
- Minimizes the impact of changes
### Behavioral Patterns
- Defines rules and methods for how objects work together
- Protocols for dividing tasks and data flow
- Improves system efficiency

### Common Patterns
- Singleton - a class that only has one instance and can provide a point of access from anywhere
``` c#
// singleton pattern
public class Database
{
    private static Database instance;
    private static readonly object lockObject = new object();

    // Private constructor prevents instantiation from other classes
    private Database() { }

    public static Database GetInstance()
    {
        if (instance == null)
        {
            lock (lockObject)
            {
                if (instance == null)
                {
                    instance = new Database();
                }
            }
        }
        return instance;
    }

    public void Connect()
    {
        Console.WriteLine("Database connected.");
    }
}
```
- Factory - factory method or class handles requests to create objects
``` c#
// factory pattern
public abstract class Animal
{
    public abstract void Speak();
}

public class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Woof!");
    }
}

public class Cat : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Meow!");
    }
}

public class AnimalFactory
{
    public static Animal CreateAnimal(string type)
    {
        if (type == "Dog")
        {
            return new Dog();
        }
        else if (type == "Cat")
        {
            return new Cat();
        }
        else
        {
            throw new ArgumentException("Invalid animal type");
        }
    }
}
```
- Observer - one object notifies other object about state changes - useful for event notifications
``` c#
// observer pattern
public interface IObserver
{
    void Update(string message);
}

public class ConcreteObserver : IObserver
{
    private string name;

    public ConcreteObserver(string name)
    {
        this.name = name;
    }

    public void Update(string message)
    {
        Console.WriteLine($"{name} received message: {message}");
    }
}

public class Subject
{
    private List<IObserver> observers = new List<IObserver>();

    public void Attach(IObserver observer)
    {
        observers.Add(observer);
    }

    public void Detach(IObserver observer)
    {
        observers.Remove(observer);
    }

    public void Notify(string message)
    {
        foreach (var observer in observers)
        {
            observer.Update(message);
        }
    }
}
```