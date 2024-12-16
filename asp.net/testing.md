# Testing

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