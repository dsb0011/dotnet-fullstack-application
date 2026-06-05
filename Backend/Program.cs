using Backend.Models;
using Microsoft.EntityFrameworkCore;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// CORS Implementation for allowing Client Application Running on different server!! : START
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
      policy  =>
      {
      policy.WithOrigins("http://localhost:5173","http://localhost:3000" ).AllowAnyHeader().AllowAnyMethod();
      });
});
// :END

// services -- Adding Controllers -- CENTRALIZATION of the Code Logic in CONTROLLER
builder.Services.AddControllers();

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException("connection string is null");

builder.Services.AddDbContext<AppDbContext> (operation => operation.UseSqlServer(connectionString));

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

// MIDDLE_WARE
app.MapControllers();

app.Run();
