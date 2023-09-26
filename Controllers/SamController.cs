using DeviceDetectorNET.Parser;
using Microsoft.AspNetCore.Mvc;

namespace backlogs.Controllers;


[ApiController]
[Route("[controller]")]
public class SamController : ControllerBase
{
    private readonly ILogger<TestingController> _logger;

    public SamController(ILogger<TestingController> logger)
    {
        _logger = logger;

        var userAgent = Request.Headers["User-Agent"];

        var botParser = new BotParser();
        botParser.SetUserAgent(userAgent);

        // OPTIONAL: discard bot information. Parse() will then return true instead of information
        botParser.DiscardDetails = true;

        var result = botParser.Parse();

        if (result != null) {
            // do not do anything if a bot is detected
            return;
        }
    }

    [HttpGet]
    public IEnumerable<UserData> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new UserData
        {
            Id = index,
            Username = new string("Appletun" + index),
            Email = new string("Appletun" + "@gmail.com")
        })
        .ToArray();
    }
}