using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace BlabIt.func
{
    public class Translate
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        /// <summary>
        /// Sends a request to the OpenAI API and streams the response back to the caller.
        /// </summary>
        /// <param name="responseStream">The stream to write the response to.</param>
        public static async Task TranslateTextStreamAsync(Stream responseStream)
        {

            var apiUrl = "https://api.openai.com/v1/chat/completions";

            var apiKey = "";

            // Request payload
            var requestBody = new
            {
                model = "gpt-4.1",
                messages = new[]
                {
                    new { role = "system", content = "You are a helpful assistant." },
                    new { role = "user", content = "Translate this text to French: Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?" }
                },
                max_tokens = 100,
                stream = true // Enable streaming
            };

            // Serialize request body to JSON
            var jsonContent = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

            // Add authorization header
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            // Create HTTP request
            var request = new HttpRequestMessage(HttpMethod.Post, apiUrl)
            {
                Content = jsonContent
            };

            // Send POST request with streaming enabled
            using var response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);

            // Ensure success status code
            response.EnsureSuccessStatusCode();

            // Read response stream
            var responseStreamFromOpenAI = await response.Content.ReadAsStreamAsync();
            using var reader = new StreamReader(responseStreamFromOpenAI);

            // Write streamed data to the response stream
            using var writer = new StreamWriter(responseStream);
            string? line;
            while ((line = await reader.ReadLineAsync()) != null)
            {
                // Optionally process the line (e.g., parse JSON if needed)
                await writer.WriteLineAsync(line);
                await writer.FlushAsync(); // Ensure data is sent immediately
            }
        }
    }
}