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

// Add request logging middleware
app.Use(async (context, next) =>
{
    // Log request method
    Console.WriteLine($"Request Method: {context.Request.Method}");
    
    // Log request path
    Console.WriteLine($"Request Path: {context.Request.Path}");

    // Log query parameters if present
    if (context.Request.QueryString.HasValue)
    {
        Console.WriteLine($"Query Parameters: {context.Request.QueryString.Value}");
    }
    
    // Read and log request body
    var originalBodyStream = context.Request.Body;
    
    try
    {
        var requestBodyContent = string.Empty;
        
        if (context.Request.ContentLength > 0)
        {
            // Enable buffering to allow reading the body multiple times
            context.Request.EnableBuffering();
            
            // Read the request body
            using (var reader = new StreamReader(
                context.Request.Body,
                encoding: Encoding.UTF8,
                detectEncodingFromByteOrderMarks: false,
                leaveOpen: true))
            {
                requestBodyContent = await reader.ReadToEndAsync();
                
                // Reset the position to the beginning for downstream middleware
                context.Request.Body.Position = 0;
            }
            
            Console.WriteLine($"Request Body: {requestBodyContent}");
        }
        
        // Call the next delegate/middleware in the pipeline
        await next();
    }
    finally
    {
        // Restore the original body stream if needed
        context.Request.Body = originalBodyStream;
    }
});

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
