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
    // public ActionResult<string> Get()
    // {
    //     return "This is the Appletun API";
    // }
    public IEnumerable<UserData> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new UserData
        {
            Username = new string("Appletun" + index),
            Email = new string("Appletun" + "@gmail.com")
        })
        .ToArray();
    }
}