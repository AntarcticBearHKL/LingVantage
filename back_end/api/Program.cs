using BlabIt.Services;

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

app.UseCors("AllowAll");

//app.UseHttpsRedirection();

app.MapGet("/b", () => "Response from /b");
app.MapGet("/c", () => "Response from /c");

app.MapGet("/context", async (string message) =>
{
    Console.WriteLine("Transcribe endpoint hitssss");
    try
    {
        var openAiService = new OpenAIService();
        var response = await openAiService.GetCompletionAsync(message);
        return Results.Ok(new { response = response });
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
        return Results.Problem(ex.Message);
    }
});

app.MapPost("/transcribe", async (HttpContext context) =>
{
    Console.WriteLine("Transcribe endpoint hit");
    try
    {
        if (!context.Request.HasFormContentType)
        {
            //Console.WriteLine("1");
            return Results.BadRequest("Request must be multipart/form-data");
        }

        var form = await context.Request.ReadFormAsync();
        var file = form.Files.GetFile("audio");
        
        if (file == null)
        {
            //Console.WriteLine("2");
            return Results.BadRequest("No audio file provided");
        }

        Console.WriteLine("Transcribe endpoint hit 2");

        var transcribeService = new TranscribeService();
        var transcription = await transcribeService.TranscribeAudioAsync(file);
        
        return Results.Ok(new { text = transcription });
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
        return Results.Problem(ex.Message);
    }
});


app.Run();
