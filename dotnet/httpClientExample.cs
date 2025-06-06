using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

class Program
{
    static async Task Main()
    {
        // 1. Build URL with encoded query parameters
        string baseUrl = "https://example.com/api/resource";
        string name = HttpUtility.UrlEncode("Joël");
        string role = HttpUtility.UrlEncode("developer");
        string url = $"{baseUrl}?name={name}&role={role}";

        // 2. Prepare payload (JSON)
        var data = new { action = "submit" };
        var serializer = new JavaScriptSerializer();
        string jsonPayload = serializer.Serialize(data);

        using (var client = new HttpClient())
        {
            // --- Optional: Add headers ---
            // client.DefaultRequestHeaders.Add("Authorization", "Bearer YOUR_TOKEN");
            // client.DefaultRequestHeaders.Add("User-Agent", "MyApp/1.0");

            // --- Optional: Custom timeout ---
            // client.Timeout = TimeSpan.FromSeconds(10);

            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            try
            {
                // 3. Send POST request
                HttpResponseMessage response = await client.PostAsync(url, content);

                // 4. Read and log raw response
                string responseText = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Raw Response:");
                Console.WriteLine(responseText);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Error: {(int)response.StatusCode} - {response.ReasonPhrase}");
                    return;
                }

                // 5. Parse JSON response
                var parsed = serializer.Deserialize<dynamic>(responseText);
                Console.WriteLine("Parsed Result:");
                Console.WriteLine(parsed["someKey"]);  // Replace with actual key
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("HTTP Error:");
                Console.WriteLine(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("General Error:");
                Console.WriteLine(ex.Message);
            }
        }
    }
}
