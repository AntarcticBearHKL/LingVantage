using System.Text;
using System.Text.Json;
using System.Net.Http.Headers;
using System.IO;

namespace BlabIt.Services;

public class ContextAPI
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    private const string sys_prompt = """
    You are a smart and insightful spoken English tutor. I will give you a specific situation, and you need to tell me how native English speakers would naturally express themselves in that context. You must return only one single list of list. The dictionary should strictly follow this format and contain exactly the following fields:
    you must have four recommend and two scenario"[["Recommended Response","Recommended Response 1"],["Possible Scenario","Scenario 1"],]"
    The returned translation should be a neatly formatted single line of text with no line breaks, and it must be directly formatted into a compact JSON string. Just one line!!!
    """;

    public ContextAPI()
    {
        _httpClient = new HttpClient();
        try
        {
            _apiKey = File.ReadAllText("/certs/openai/key").Trim();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to read OpenAI API key from file: {ex.Message}");
        }
        
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
    }

    public async Task<string> GetCompletionAsync(string prompt)
    {
        Console.WriteLine("GetCompletionAsync called with prompt: " + prompt);
        var request = new
        {
            model = "gpt-4.1",
            messages = new[]
            {
                new { role = "system", content = sys_prompt },
                new { role = "user", content = prompt }
            }
        };

        var content = new StringContent(
            JsonSerializer.Serialize(request),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.PostAsync(
            "https://api.openai.com/v1/chat/completions",
            content
        );

        response.EnsureSuccessStatusCode();
        
        var responseContent = await response.Content.ReadAsStringAsync();
        var responseObject = JsonSerializer.Deserialize<JsonElement>(responseContent);
        
        return responseObject
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? string.Empty;
    }
}