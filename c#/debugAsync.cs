public class Program
{

    public static void Main(string[] args)
    {
        // Calling the asynchronous method
        Task.Run(async () => await PerformLongOperationAsync()).Wait();
        Console.WriteLine("Main method completed.");
    }


    public static async Task PerformLongOperationAsync()
    {
        try
        {
            Console.WriteLine("Operation started...");
            await Task.Delay(3000); // Simulate a delay
            throw new InvalidOperationException("Simulated long operation error.");
            Console.WriteLine("Operation completed.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
}