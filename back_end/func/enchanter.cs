using System.Text;
using System.Text.Json;
using System.Net.Http.Headers;

namespace BlabIt.Services;

public class EnchanterAPI
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    private const string sys_prompt = """
    You're a smart and insightful spoken English tutor. I'll give you a specific situation, and I'd like you to show me how native speakers would naturally express the same idea.
    First, please rewrite it in a more natural, fluent, and conversational way, completely reorganizing it if needed.
    Then, analyze the original version by pointing out any obvious word choice issues, grammar mistakes, or logic problems.
    Also, suggest more concise or native-like alternatives, or high-level vocabulary equivalent to an IELTS Band 9.
    Please return your response in the format of a list, following the order I've given below. Items may repeat.
    “[["idiomatic", "comment", None],["wordError", "original", "suggestion"], ["grammarError", "original", "suggestion"], ["logicError", "original", "suggestion"], ["wordChoice", "original", "suggestion"]]”
    The returned translation should be a neatly formatted single line of text with no line breaks, and it must be directly formatted into a compact JSON string. Just one line!!!
    """;

    public EnchanterAPI()
    {
        _httpClient = new HttpClient();
        _apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY") 
            ?? throw new InvalidOperationException("OPENAI_API_KEY environment variable is not set");
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