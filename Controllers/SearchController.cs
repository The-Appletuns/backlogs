using backlogs.Models;
using backlogs.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backlogs.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]

public class SearchController : ControllerBase
{
    private readonly UsersService _usersService;

    public SearchController(UsersService usersService) =>
        _usersService = usersService;

    [HttpGet]
    public async Task<List<User>> Get()
    {
        var usernamelist = await _usersService.GetAsync();

        return usernamelist;
    }
}