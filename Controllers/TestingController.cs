using Ical.Net.DataTypes;
using Microsoft.AspNetCore.Mvc;

namespace backlogs.Controllers;

[ApiController]
[Route("[controller]")]
public class TestingController : ControllerBase
{
    private readonly ILogger<TestingController> _logger;

    public TestingController(ILogger<TestingController> logger)
    {
        _logger = logger;
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

    [HttpPost]
    public IEnumerable<GameData> Post()
    {
        return Enumerable.Range(1, 5).Select(index => new GameData
        {
            Name = new string("Game " + index),
            Systems = new string[6],
            DatePlayed = new CalDateTime(DateTime.Now)
        })
        .ToArray();
    }
}