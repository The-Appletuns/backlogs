using Microsoft.AspNetCore.Mvc;

namespace backlogs.Controllers;

[ApiController]
[Route("[controller]")]
public class TestingController : ControllerBase
{
    [HttpGet]
    public ActionResult<string> Get()
    {
        return "This is the Appletun Team";
    }
}