# Asynchronous Programming

## Definition
Allows tasks to run independently of the main program flow, enabling the program to start new tasks without waiting for the previous ones to complete
- async - defines a method as asynchronous
- await - marks points where the program can pause and wait for the task to complete

## Common Uses
- I/O Operations
- Network Requests
- Improving application responsiveness

### Examples:
- Fetching data from multiple sources simultaneously 
- Performing multiple tasks - loading items to shopping cart, loading products, performing data analysis for product recommendations simultaneously
- Reading, writing, converting files in the background

### Best Practices:
- Async simplifies code from having to use callbacks
- Make sure to handle all exceptions properly
- Optimize resource usage using a task queue
- Avoid blocking operations (using external libraries)

## Debugging Async:
### Problems
- Non-linear execution makes it harder to trace
- Errors may not be immediately apparent leading to silent failures (especially if error handling is not robust)
- Race conditions - tasks that perform operations on the same data at the same time causing unpredictable results

### Techniques
- Use breakpoints to examine the state of the application
- You can log Tasks by state - pending, running, completed, failed (Task Explorer in VS Code)
- Use robust error handling to pinpoint what Task is failing
- Logpoints - logs variable values and messages to the console
- Call Stack Tool - trace calls and how the program is running

``` c#
// downloading files
public async Task DownloadFilesAsync()
{
    // Start downloading "File1.txt" and "File2.txt" concurrently
    var downloadTask1 = DownloadFileAsync("File1.txt");
    var downloadTask2 = DownloadFileAsync("File2.txt");

    // Wait for both downloads to complete
    await Task.WhenAll(downloadTask1, downloadTask2);

    Console.WriteLine("All downloads completed.");
}

public static async Task Main(string[] args)
{
    Program program = new Program();
    await program.DownloadFilesAsync();
}
```
``` c#
// processing data
public async Task ProcessLargeDatasetAsync(int numberOfChunks)
{
    var tasks = new List<Task>();

    // Start processing each chunk concurrently
    for (int i = 1; i <= numberOfChunks; i++)
    {
        tasks.Add(ProcessDataChunkAsync(i));
    }

    // Wait for all tasks to complete
    await Task.WhenAll(tasks);

    Console.WriteLine("All data chunks processed.");
}

public static async Task Main(string[] args)
{
    Program program = new Program();
    await program.ProcessLargeDatasetAsync(5); // Process 5 chunks
}
```