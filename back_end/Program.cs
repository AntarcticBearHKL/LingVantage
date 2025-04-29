using BlabIt.Services;
using Microsoft.AspNetCore.HttpOverrides;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
             .AllowAnyMethod()
             .AllowAnyHeader();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Enable HTTPS redirection and appropriate headers forwarding if behind proxy
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.UseCors("AllowAll");

app.MapGet("/context", async (string message) =>
{
    try
    {
        Console.WriteLine($"Request to /context: {message}");
        
        var openAiService = new ContextAPI();
        var response = await openAiService.GetCompletionAsync(message);
        
        Console.WriteLine($"Response from /context: {response}");
        return Results.Ok(new { response = response });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in /context: {ex.Message}");
        return Results.Problem(ex.Message);
    }
});

app.MapGet("/enchanter", async (string message) =>
{
    try
    {
        Console.WriteLine($"Request to /enchanter: {message}");
        
        var openAiService = new EnchanterAPI();
        var response = await openAiService.GetCompletionAsync(message);
        
        Console.WriteLine($"Response from /enchanter: {response}");
        return Results.Ok(new { response = response });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in /enchanter: {ex.Message}");
        return Results.Problem(ex.Message);
    }
});

app.MapGet("/mirror", async (string message) =>
{
    try
    {
        Console.WriteLine($"Request to /mirror: {message}");
        
        var openAiService = new MirrorAPI();
        var response = await openAiService.GetCompletionAsync(message);
        
        Console.WriteLine($"Response from /mirror: {response}");
        return Results.Ok(new { response = response });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in /mirror: {ex.Message}");
        return Results.Problem(ex.Message);
    }
});

app.MapPost("/transcribe", async (HttpContext context) =>
{
    try
    {
        Console.WriteLine("Request to /transcribe");
        
        if (!context.Request.HasFormContentType)
        {
            Console.WriteLine("Error: Request must be multipart/form-data");
            return Results.BadRequest("Request must be multipart/form-data");
        }

        var form = await context.Request.ReadFormAsync();
        var file = form.Files.GetFile("audio");
        
        if (file == null)
        {
            Console.WriteLine("Error: No audio file provided");
            return Results.BadRequest("No audio file provided");
        }

        Console.WriteLine($"Audio file received: {file.FileName}, Size: {file.Length} bytes");

        var transcribeService = new TranscribeService();
        var transcription = await transcribeService.TranscribeAudioAsync(file);
        
        Console.WriteLine($"Transcription result: {transcription}");
        return Results.Ok(new { text = transcription });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in /transcribe: {ex.Message}");
        return Results.Problem(ex.Message);
    }
});

app.Run();
