using BlabIt.Services;
using Microsoft.AspNetCore.HttpOverrides;

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
        var openAiService = new ContextAPI();
        var response = await openAiService.GetCompletionAsync(message);
        return Results.Ok(new { response = response });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapGet("/enchanter", async (string message) =>
{
    try
    {
        var openAiService = new EnchanterAPI();
        var response = await openAiService.GetCompletionAsync(message);
        return Results.Ok(new { response = response });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapGet("/mirror", async (string message) =>
{
    try
    {
        var openAiService = new MirrorAPI();
        var response = await openAiService.GetCompletionAsync(message);
        return Results.Ok(new { response = response });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPost("/transcribe", async (HttpContext context) =>
{
    try
    {
        if (!context.Request.HasFormContentType)
        {
            return Results.BadRequest("Request must be multipart/form-data");
        }

        var form = await context.Request.ReadFormAsync();
        var file = form.Files.GetFile("audio");
        
        if (file == null)
        {
            return Results.BadRequest("No audio file provided");
        }


        var transcribeService = new TranscribeService();
        var transcription = await transcribeService.TranscribeAudioAsync(file);
        
        return Results.Ok(new { text = transcription });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.Run();
