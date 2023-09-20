using Microsoft.AspNetCore.Mvc;

namespace backlogs.Controllers;

[ApiController]
[Route("[controller]")]
public class EstefController : ControllerBase
{
    private readonly ILogger<TestingController> _logger;

    public EstefController(ILogger<TestingController> logger)
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
}