# Testing
- Continuous testing - test are run early in the development process as every change moves through the pipeline.
- Shifting left - considering software quality and testing earlier in the development process.

## What makes a good test?

1. Don't test for the sake of testing: Your tests should serve a purpose beyond being a checklist item to cross off. Write tests that verify that your critical code works as intended and doesn't break existing functionality.
2. Keep your tests short: Tests should finish as quickly as possible, especially those that happen during the development and build phases. When tests are run as each change moves through the pipeline, you don't want them to be the bottleneck.
3. Ensure that your tests are repeatable: Test runs should produce the same results each time, whether you run them on your computer, a coworker's computer, or in the build pipeline.
4. Keep your tests focused: A common misconception is that tests are meant to cover code written by others. Ordinarily, your tests should cover only your code. For example, if you're using an open-source graphics library in your project, you don't need to test that library.
5. Choose the right granularity: For example, if you're performing unit testing, an individual test shouldn't combine or test multiple functions or methods. Test each function separately and later write integration tests that verify that multiple components interact properly.

## Functional Test Types
1. Smoke Tests - Most basic functionality to test before moving further - Check that the website loads and returns a 200 
2. Unit Tests - Low level tests that ensure each method works correctly
3. Integration Tests - Different components work together - database, endpoints, etc...
4. Regression Tests - Run after code changes to ensure changes did not break anything and pass all tests/build
5. UI Tests - Check that the actions the user takes to perform a task produce the correct results
6. Usability Tests - Performed by a person checking the usability characteristics of the software
7. User Acceptance Tests - Performed by real end users to verify the desired behaviors are correctly developed 


## Test Commands
``` c#
// build a configuration with testing
dotnet build --configuration Release

// run the testing, but not the build
dotnet test --configuration Release --no-build

// run tests with logging the results
dotnet test Tailspin.SpaceGame.Web.Tests --configuration Release --no-build --logger trx

// code coverage testing (after dependency install & setup)
dotnet test --no-build \
  --configuration Release \
  /p:CollectCoverage=true \
  /p:CoverletOutputFormat=cobertura \
  /p:CoverletOutput=./TestResults/Coverage/

// code coverage html reporting using ReportGenerator
dotnet tool run reportgenerator \
  -- -reports:./Tailspin.SpaceGame.Web.Tests/TestResults/Coverage/coverage.cobertura.xml \
  -targetdir:./CodeCoverage \
  -reporttypes:HtmlInline_AzurePipelines

```

## Unit Testing with NUnit

``` c#
namespace Tests
{
    public class DocumentDBRepository_GetItemsAsyncShould
    {
        private IDocumentDBRepository<Score> _scoreRepository;

        [SetUp]
        public void Setup()
        {
            using (Stream scoresData = typeof(IDocumentDBRepository<Score>)
                .Assembly
                .GetManifestResourceStream("Tailspin.SpaceGame.Web.SampleData.scores.json"))
            {
                _scoreRepository = new LocalDocumentDBRepository<Score>(scoresData);
            }
        }

        [TestCase("Milky Way")]
        [TestCase("Andromeda")]
        [TestCase("Pinwheel")]
        [TestCase("NGC 1300")]
        [TestCase("Messier 82")]
        public void FetchOnlyRequestedGameRegion(string gameRegion)
        {
            const int PAGE = 0; // take the first page of results
            const int MAX_RESULTS = 10; // sample up to 10 results

            // Form the query predicate.
            // Select all scores for the provided game region.
            Func<Score, bool> queryPredicate = score => (score.GameRegion == gameRegion);

            // Fetch the scores.
            Task<IEnumerable<Score>> scoresTask = _scoreRepository.GetItemsAsync(
                queryPredicate, // the predicate defined above
                score => 1, // we don't care about the order
                PAGE,
                MAX_RESULTS
            );
            IEnumerable<Score> scores = scoresTask.Result;

            // Verify that each score's game region matches the provided game region.
            Assert.That(scores, Is.All.Matches<Score>(score => score.GameRegion == gameRegion));
        }
    }
}
```

## Mocking
1. Create an interface for the implementation
2. In a testing file:
    1. Creates a mock implementation of the IPersonService interface that returns a hard-coded string.
    2. Registers the mock implementation with the service container.
    3. Creates an HTTP client to make a request to the API endpoint.
    4. Asserts that the response from the API endpoint is as expected.


``` c#
    // API route with an interface to the PersonService
    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddSingleton<IPersonService, PersonService>();

    var app = builder.Build();

    app.MapGet("/", (IPersonService personService) =>
    {
        return $"Hello, {personService.GetPersonName()}!";
    });

    app.Run();
```

## Fixing a Failed Test
1. Analyze the test failure - review the test failure output 
2. Find the cause of the error (in the test, code, environment...)
3. Fix the error
4. Re-run tests to validate


## Mocking in .NET

``` c#
    // Mocking the PersonService to test the "/" API route response
    using Microsoft.AspNetCore.Mvc.Testing;
    using Microsoft.Extensions.DependencyInjection;
    using Moq;
    using MyWebApp;
    using System.Net;

    public class GreetingApiTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public GreetingApiTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetGreeting_ReturnsExpectedGreeting()
        {
            //Arrange
            var mockPersonService = new Mock<IPersonService>();
            mockPersonService.Setup(service => service.GetPersonName()).Returns("Jane Doe");

            var client = _factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    services.AddSingleton(mockPersonService.Object);
                });
            }).CreateClient();

            // Act
            var response = await client.GetAsync("/");
            var responseString = await response.Content.ReadAsStringAsync();

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Hello, Jane Doe!", responseString);
        }
    }
```

## Robust testing plan for CRUD API backend
Creating a robust testing plan for a .NET entity with CRUD (Create, Read, Update, Delete) endpoints involves designing tests that ensure functionality, reliability, and maintainability. Below is a comprehensive testing plan to follow best practices:

1. Unit Testing

- Purpose: Test individual methods in isolation.
	- Tool: xUnit, NUnit, or MSTest.
	- Mocks/Stubs: Use a mocking framework like Moq to simulate dependencies (e.g., database context, external services).

- Tests to Implement:
	- Create:
	- Validate successful creation of an entity.
	- Handle invalid input (e.g., null, missing fields, duplicate records).
	- Read:
	- Validate retrieval of a single entity by ID.
	- Validate retrieval of all entities with pagination/filtering (if applicable).
	- Handle scenarios where the entity does not exist.
	- Update:
	- Validate successful updates to an entity.
	- Handle updates with invalid data (e.g., null fields, ID mismatch).
	- Delete:
	- Validate successful deletion of an entity.
	- Handle scenarios where the entity does not exist.

2. Integration Testing

- Purpose: Test the interaction between the service and the database (or other integrated components).
	- Tool: xUnit, NUnit, or MSTest with an in-memory database (e.g., Microsoft.EntityFrameworkCore.InMemory).
	- Setup: Use a dedicated test database or an in-memory database.

- Tests to Implement:
	- Test CRUD operations against a real database context to validate schema integrity.
	- Verify that constraints (e.g., unique keys, foreign keys) are enforced.
	- Ensure entity relationships (e.g., one-to-many, many-to-many) are correctly handled.

3. API Testing

- Purpose: Validate the HTTP endpoints and their interaction with the application logic.
	- Tool: Postman, RestSharp, or ASP.NET Core’s WebApplicationFactory for in-process API testing.

- Tests to Implement:
	- Create:
        - Test endpoint for 201 Created response with valid input.
        - Test 400 Bad Request response for invalid input.
	- Read:
        - Validate 200 OK response with correct data.
        - Test 404 Not Found response for non-existent IDs.
	- Update:
        - Test endpoint for 200 OK/204 No Content response on successful update.
        - Test 400 Bad Request or 404 Not Found for invalid/missing input.
	- Delete:
        - Test endpoint for 204 No Content on successful deletion.
        - Test 404 Not Found for non-existent IDs.
	- General:
        - Test edge cases for large datasets, malformed requests, or exceeding payload limits.

4. Functional Testing

- Purpose: Ensure end-to-end functionality meets user requirements.
- Tool: Selenium or Playwright (if the application has a UI).

- Tests to Implement:
    - Test CRUD operations via the application’s frontend or API gateway.
    - Validate workflows that span multiple CRUD operations.

5. Performance Testing

- Purpose: Ensure the endpoints handle expected loads.
- Tool: Apache JMeter, k6, or Artillery.
- Metrics: Response time, throughput, error rates.

Tests to Implement:
- Test API performance under normal and peak loads.
- Identify bottlenecks in CRUD operations (e.g., database indexing).

6. Security Testing

- Purpose: Verify the API is secure against common vulnerabilities.
- Tool: OWASP ZAP, Burp Suite, or manual checks.
- Focus Areas:
- Input validation to prevent SQL injection.
- Authorization and authentication (even if not required yet, plan for it).
- Proper handling of sensitive data (e.g., avoiding exposing database IDs unnecessarily).

7. Regression Testing

- Purpose: Ensure new changes don’t break existing functionality.
- Tool: Automate with CI/CD pipeline (e.g., GitHub Actions, Azure Pipelines).
- Approach:
- Maintain a suite of automated tests.
- Run the tests on every build or pull request.

8. Test Data Management
- Use a seed script or a mock dataset for testing environments.
- Isolate test data from production data.
- Ensure data is reset between tests to avoid pollution.

9. Continuous Integration/Continuous Deployment (CI/CD)
- Automate the test suite execution on every code push.
- Enforce test coverage thresholds for builds to pass.


## Using Selenium for UI Testing
Steps:
1. Create an NUnit project that includes Selenium. The project will be stored in the directory along with the app's source code.
2. Write a test case that uses automation to click the specified link. The test case verifies that the expected modal window appears.
3. Use the id attribute we saved to specify the parameters to the test case method. This task creates a sequence, or series, of tests.
4. Configure the tests to run on Chrome, Firefox, and Microsoft Edge. This task creates a matrix of tests.
5. Run the tests and watch each web browser come up automatically.
6. Watch Selenium automatically run through the series of tests for each browser.
7. In the console window, verify that all the tests pass.

``` c#
    [TestFixture("Chrome")]
    [TestFixture("Firefox")]
    [TestFixture("Edge")]

    public class HomePageTest
    {
        private string browser;
        private IWebDriver driver;

        // test constructor
        public HomePageTest(string browser)
        {
            this.browser = browser;
        }
    }

    [OneTimeSetUp]
    public void Setup()
    {
        // Create the driver for the current browser.
        switch(browser)
        {
            case "Chrome":
            driver = new ChromeDriver(
                Environment.GetEnvironmentVariable("ChromeWebDriver")
            );
            break;
            case "Firefox":
            driver = new FirefoxDriver(
                Environment.GetEnvironmentVariable("GeckoWebDriver")
            );
            break;
            case "Edge":
            driver = new EdgeDriver(
                Environment.GetEnvironmentVariable("EdgeWebDriver"),
                new EdgeOptions
                {
                    UseChromium = true
                }
            );
            break;
            default:
            throw new ArgumentException($"'{browser}': Unknown browser");
        }
    }

    private IWebElement FindElement(By locator, IWebElement parent = null, int timeoutSeconds = 10)
    {
        // WebDriverWait enables us to wait for the specified condition to be true
        // within a given time period.
        return new WebDriverWait(driver, TimeSpan.FromSeconds(timeoutSeconds))
            .Until(c => {
                IWebElement element = null;
                // If a parent was provided, find its child element.
                if (parent != null)
                {
                    element = parent.FindElement(locator);
                }
                // Otherwise, locate the element from the root of the DOM.
                else
                {
                    element = driver.FindElement(locator);
                }
                // Return true after the element is displayed and is able to receive user input.
                return (element != null && element.Displayed && element.Enabled) ? element : null;
            });
    }

    private void ClickElement(IWebElement element)
    {
        // We expect the driver to implement IJavaScriptExecutor.
        // IJavaScriptExecutor enables us to execute JavaScript code during the tests.
        IJavaScriptExecutor js = driver as IJavaScriptExecutor;

        // Through JavaScript, run the click() method on the underlying HTML object.
        js.ExecuteScript("arguments[0].click();", element);
    }

    // THREE TEST CASES FOR MODALS TO APPEAR/DISAPPEAR 
    // Download game
    [TestCase("download-btn", "pretend-modal")]
    // Screen image
    [TestCase("screen-01", "screen-modal")]
    // // Top player on the leaderboard
    [TestCase("profile-1", "profile-modal-1")]
    public void ClickLinkById_ShouldDisplayModalById(string linkId, string modalId)
    {
        // Skip the test if the driver could not be loaded.
        // This happens when the underlying browser is not installed.
        if (driver == null)
        {
            Assert.Ignore();
            return;
        }

        // Locate the link by its ID and then click the link.
        ClickElement(FindElement(By.Id(linkId)));

        // Locate the resulting modal.
        IWebElement modal = FindElement(By.Id(modalId));

        // Record whether the modal was successfully displayed.
        bool modalWasDisplayed = (modal != null && modal.Displayed);

        // Close the modal if it was displayed.
        if (modalWasDisplayed)
        {
            // Click the close button that's part of the modal.
            ClickElement(FindElement(By.ClassName("close"), modal));

            // Wait for the modal to close and for the main page to again be clickable.
            FindElement(By.TagName("body"));
        }

        // Assert that the modal was displayed successfully.
        // If it wasn't, this test will be recorded as failed.
        Assert.That(modalWasDisplayed, Is.True);
    }



```