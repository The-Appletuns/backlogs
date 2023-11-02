using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Threading.Tasks;

namespace backlogs.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MobyGamesController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public MobyGamesController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<IActionResult> CallApi()
    {
        string apiKey = _configuration["ApiSettings:ApiKey"];
        string apiUrl = "https://api.mobygames.com/v1/games/random";

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + apiKey);
            var response = await client.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();

                return Ok(data);
            }
            else
            {
                return StatusCode((int)response.StatusCode);
            }
        }
    }
}