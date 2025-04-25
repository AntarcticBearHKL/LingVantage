using System.Threading.Tasks;
using BlabIt.func;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/a",  async (HttpContext context) =>
{
    context.Response.ContentType = "text/plain"; // 设置响应类型
    await Translate.TranslateTextStreamAsync(context.Response.Body);
});
app.MapGet("/b", () => "Response from /b");
app.MapGet("/c", () => "Response from /c");


app.Run();
