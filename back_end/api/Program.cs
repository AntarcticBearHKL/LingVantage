using BlabIt.func;
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

app.MapGet("/a",  async (HttpContext context) =>
{
    context.Response.ContentType = "text/plain"; // 设置响应类型
    await Translate.TranslateTextStreamAsync(context.Response.Body);
});
app.MapGet("/b", () => "Response from /b");
app.MapGet("/c", () => "Response from /c");

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
