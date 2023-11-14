using backlogs.Models;
using backlogs.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

public class Program
{
    public static void Main (string[] args)
    {
        var host = CreateHostBuilder(args).Build();

        host.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                // Access Configure the configuration setttings here
                var environment = hostingContext.HostingEnvironment;
                config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            })
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}

// unused code from old script
// var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// The Database
// builder.Services.Configure<BackLogsDatabaseSettings>(
//     builder.Configuration.GetSection("BackLogsDatabase"));

// User service system
// builder.Services.AddSingleton<UsersService>();

// builder.Services.AddControllers()
//     .AddJsonOptions(
//         options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// JWT Authentication Service
// builder.Services.AddAuthentication(x =>
//     {
//         x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//         x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//     }
// )
// .AddJwtBearer(x => 
// {
//     x.RequireHttpsMetadata = false;
//     x.SaveToken = true;
//     x.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidateIssuerSigningKey = true,
//         // IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(IConfiguration.GetSection("JwtKey").ToString())),
//         ValidateIssuer = false,
//         ValidateAudience = false
//     };
// });

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (!app.Environment.IsDevelopment())
// {
//     // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//     app.UseHsts();
// }

// app.UseHttpsRedirection();
// app.UseStaticFiles();
// app.UseRouting();


// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller}/{action=Index}/{id?}");

// app.MapFallbackToFile("index.html");

// app.Run();
