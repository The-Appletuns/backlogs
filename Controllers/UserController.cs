using backlogs.Models;
using backlogs.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.IO;

namespace backlogs.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UsersService _usersService;

    public UserController(UsersService usersService) =>
        _usersService = usersService;
    
    [HttpGet]
    public async Task<List<User>> Get() =>
        await _usersService.GetAsync();
    
    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<User>> Get(string id)
    {
        var user = await _usersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        return user;
    }

    [AllowAnonymous]
    [Route("signup")]
    [HttpPost]
    public async Task<IActionResult> Post(User newUser)
    {
        await _usersService.CreateAsync(newUser);

        return CreatedAtAction(nameof(Get), new { id = newUser.id}, newUser);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, User updatedUser)
    {
        var user = await _usersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        updatedUser.id = user.id;

        await _usersService.UpdateAsync(id, updatedUser);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await _usersService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        await _usersService.RemoveAsync(id);

        return NoContent();
    }

    [AllowAnonymous]
    [Route("authenticate")]
    [HttpPost]
    public ActionResult Login( [FromBody] User user)
    {
        var token = _usersService.Authenticate(user.Email, user.Password);

        if (token == null)
        {
            return Unauthorized();
        }

        var currentUser = _usersService.GetUserFromEmail(user.Email);

        return Ok(new {token, currentUser});
    }

    [Route("follow")]
    [HttpPut]
    public async Task<IActionResult> Follow( string currentUser, string followingUser)
    {
        try 
        {
            var currentUserData = await _usersService.GetAsync(currentUser);
            var followingUserData = await _usersService.GetAsync(followingUser);

            if (currentUserData is null || followingUserData is null) 
            {
                return NotFound();
            }

            currentUserData.Following.Add(followingUser);
            followingUserData.Followers.Add(currentUser);

            await _usersService.UpdateAsync(currentUser, currentUserData);
            await _usersService.UpdateAsync(followingUser, followingUserData);

            return NoContent();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in Follow: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }
}