using System.Net.Http.Headers;

namespace BlabIt.Services;

public class TranscribeService
{
    private readonly string _apiKey;
    private readonly HttpClient _httpClient;
    private const string OPENAI_API_URL = "https://api.openai.com/v1/audio/transcriptions";

    public TranscribeService()
    {
        _apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY") 
            ?? throw new ArgumentNullException("OPENAI_API_KEY environment variable is not set");
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
        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<TranscriptionResponse>();
        return result?.Text ?? string.Empty;
    }
}

public class TranscriptionResponse
{
    public string Text { get; set; } = string.Empty;
}