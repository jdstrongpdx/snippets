DRY – Don’t Repeat Yourself vs WET - Write Everything Twice
KISS – Keep It Simple, Stupid
YAGNI – You Ain’t Gonna Need It
SOLID – (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)
    Single Responsibility Principle (SRP) 
        - A class/module should have only one responsibility (one reason to change).
        - ex. Avoid combining user authentication and logging in one class.
    Open/Closed Principle (OCP) 
        - Classes should be open for extension but closed for modification.
        - ex. Add new functionality via inheritance or composition, not by changing existing code.
    Liskov Substitution Principle (LSP) 
        - Definition: Subtypes must be substitutable for their base types.
        - ex. If Bird has a fly() method, all subclasses (like Sparrow) must also support fly() logically.
    Interface Segregation Principle (ISP) 
        - Definition: Smaller, specific interfaces are better than one large, general-purpose interface.
        - ex. Instead of a Shape interface with both draw() and resize(), use separate interfaces.
    Dependency Inversion Principle (DIP) 
        - Definition: Depend on abstractions, not concrete implementations.
        - ex. Inject dependencies through constructors or setters rather than hard-coding them.

TDD – Test-Driven Development
BDD – Behavior-Driven Development - Extend TDD by focusing on the behavior expected from the software (using user stories).
CI/CD – Continuous Integration / Continuous Deployment (or Delivery)
POC – Proof of Concept
MVC – Model-View-Controller
DDD – Domain-Driven Design - Focuses on structuring software around the real-world business domain.
GRASP – General Responsibility Assignment Software Patterns - A set of patterns for assigning responsibilities in object-oriented design.
    Information Expert - Assign responsibility to the class with the necessary information to fulfill it.
        - ex. A Customer class should calculate its own totalOrderValue if it holds the order data.
    Creator - Assign responsibility to a class that can logically create an instance of another class.
        - ex: A Customer creates Order objects since customers initiate orders.
    Controller - Use a controller object to handle input and delegate tasks to other classes.
        -ex. A LoginController handles authentication logic and calls relevant services.
    Low Coupling - Minimize dependencies between classes to reduce the impact of changes.
        -ex. Use interfaces or dependency injection to decouple services.
    High Cohesion - Group related tasks in the same class to keep the code focused and manageable.
        -ex. A UserService handles all user-related operations.
    Polymorphism - Use polymorphism to handle variations instead of conditional logic.
        - ex.  Different payment types (e.g., CreditCard, PayPal) implement a common Payment interface.
    Pure Fabrication - Create artificial classes when no natural class fits a responsibility.
        - ex. A Logger class for logging operations that don’t belong to any core business entity.
    Indirection - Use intermediary objects to reduce coupling between components.
        - ex. A Facade provides a simplified interface to complex subsystems.
    Protected Variations - Isolate changes behind stable interfaces to prevent them from affecting other parts of the system.
        - ex. Use a strategy pattern to switch algorithms without impacting the client.