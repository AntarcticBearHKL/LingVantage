using System.Net.Http.Headers;
using System.IO;

namespace BlabIt.Services;

public class TranscribeService
{
    private readonly string _apiKey;
    private readonly HttpClient _httpClient;
    private const string OPENAI_API_URL = "https://api.openai.com/v1/audio/transcriptions";

    public TranscribeService()
    {
        try
        {
            _apiKey = File.ReadAllText("/certs/openai/key").Trim();
            Console.WriteLine($"OpenAI API key loaded: {_apiKey}");
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to read OpenAI API key from file: {ex.Message}");
        }
        
        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
    }

    public async Task<string> TranscribeAudioAsync(IFormFile audioFile)
    {
        using var formData = new MultipartFormDataContent();
        using var fileContent = new StreamContent(audioFile.OpenReadStream());

        
        formData.Add(fileContent, "file", audioFile.FileName);
        formData.Add(new StringContent("whisper-1"), "model");


        var response = await _httpClient.PostAsync(OPENAI_API_URL, formData);
        
        // 打印响应内容，无论成功与否
        var responseContent = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"OpenAI API Response Status: {response.StatusCode}");
        Console.WriteLine($"OpenAI API Response Content: {responseContent}");

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<TranscriptionResponse>();
        return result?.Text ?? string.Empty;
    }
}

public class TranscriptionResponse
{
    public string Text { get; set; } = string.Empty;
}