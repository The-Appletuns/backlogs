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
    
    [AllowAnonymous]
    [HttpGet] 
    public async Task<List<User>> Get() =>
        await _usersService.GetAsync();
    
    [AllowAnonymous]
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
    [Route("searchusername")]
    [HttpGet("{username}")]
    public async Task<ActionResult<User>> GetByUsername(string username)
    {
        var user = await _usersService.GetUserFromUsername(username);

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
    public async Task<IActionResult> Follow( [FromBody] FollowRequest followRequest )
    {
        try 
        {
            string currentUserID = followRequest.CurrentUserID;
            string followingUserID = followRequest.FollowingUserID;

            Console.WriteLine(currentUserID);
            Console.WriteLine(followingUserID);

            var currentUser = await _usersService.GetAsync(currentUserID);
            var followingUser = await _usersService.GetAsync(followingUserID);

            if (currentUser is null || followingUser is null) 
            {
                return NotFound();
            }

            currentUser.Following ??= new List<string?>();
            currentUser.Followers ??= new List<string?>();
            currentUser.Games ??= new List<string?>();

            followingUser.Following ??= new List<string?>();
            followingUser.Followers ??= new List<string?>();
            followingUser.Games ??= new List<string?>();

            currentUser.Following.Add(followingUserID);
            followingUser.Followers.Add(currentUserID);

            currentUser.Following.RemoveAll(string.IsNullOrEmpty);
            currentUser.Followers.RemoveAll(string.IsNullOrEmpty);

            followingUser.Following.RemoveAll(string.IsNullOrEmpty);
            followingUser.Followers.RemoveAll(string.IsNullOrEmpty);

            await _usersService.UpdateAsync(currentUserID, currentUser);
            await _usersService.UpdateAsync(followingUserID, followingUser);

            return NoContent();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in Follow: {ex.Message}");
            Console.Error.WriteLine($"Stack Trace: {ex.StackTrace}");
            Console.Error.WriteLine($"CurrentID: {followRequest.CurrentUserID}");
            Console.Error.WriteLine($"FollowerID: {followRequest.FollowingUserID}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [Route("unfollow")]
    [HttpPut]
    public async Task<IActionResult> Unfollow( [FromBody] FollowRequest followRequest )
    {
        try 
        {
            string currentUserID = followRequest.CurrentUserID;
            string followingUserID = followRequest.FollowingUserID;

            // Console.WriteLine(currentUserID);
            // Console.WriteLine(followingUserID);

            var currentUser = await _usersService.GetAsync(currentUserID);
            var followingUser = await _usersService.GetAsync(followingUserID);

            if (currentUser is null || followingUser is null) 
            {
                return NotFound();
            }

            currentUser.Following ??= new List<string?>();
            currentUser.Followers ??= new List<string?>();
            currentUser.Games ??= new List<string?>();

            followingUser.Following ??= new List<string?>();
            followingUser.Followers ??= new List<string?>();
            followingUser.Games ??= new List<string?>();

            currentUser.Following.Remove(followingUserID);
            followingUser.Followers.Remove(currentUserID);

            currentUser.Following.RemoveAll(string.IsNullOrEmpty);
            currentUser.Followers.RemoveAll(string.IsNullOrEmpty);

            followingUser.Following.RemoveAll(string.IsNullOrEmpty);
            followingUser.Followers.RemoveAll(string.IsNullOrEmpty);

            await _usersService.UpdateAsync(currentUserID, currentUser);
            await _usersService.UpdateAsync(followingUserID, followingUser);

            return NoContent();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in Follow: {ex.Message}");
            Console.Error.WriteLine($"Stack Trace: {ex.StackTrace}");
            Console.Error.WriteLine($"CurrentID: {followRequest.CurrentUserID}");
            Console.Error.WriteLine($"FollowerID: {followRequest.FollowingUserID}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [Route("addgame")]
    [HttpPut]
    public async Task<IActionResult> AddGame( [FromBody] GameRequest gameRequest )
    {
        try 
        {
            string currentUserID = gameRequest.CurrentUserID;
            string gameData = gameRequest.GameData;

            // Console.WriteLine(currentUserID);
            // Console.WriteLine(gameData);

            var currentUser = await _usersService.GetAsync(currentUserID);

            if (currentUser is null) 
            {
                return NotFound();
            }

            currentUser.Following ??= new List<string?>();
            currentUser.Followers ??= new List<string?>();
            currentUser.Games ??= new List<string?>();

            currentUser.Games.Add(gameData);

            currentUser.Following.RemoveAll(string.IsNullOrEmpty);
            currentUser.Followers.RemoveAll(string.IsNullOrEmpty);

            await _usersService.UpdateAsync(currentUserID, currentUser);

            return NoContent();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in Follow: {ex.Message}");
            Console.Error.WriteLine($"Stack Trace: {ex.StackTrace}");
            Console.Error.WriteLine($"CurrentID: {gameRequest.CurrentUserID}");
            Console.Error.WriteLine($"GameID: {gameRequest.GameData}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [Route("removegame")]
    [HttpPut]
    public async Task<IActionResult> RemoveGame( [FromBody] GameRequest gameRequest )
    {
        try 
        {
            string currentUserID = gameRequest.CurrentUserID;
            string gameData = gameRequest.GameData;

            // Console.WriteLine(currentUserID);
            // Console.WriteLine(followingUserID);

            var currentUser = await _usersService.GetAsync(currentUserID);

            if (currentUser is null) 
            {
                return NotFound();
            }

            currentUser.Following ??= new List<string?>();
            currentUser.Followers ??= new List<string?>();
            currentUser.Games ??= new List<string?>();

            currentUser.Games.Remove(gameData);

            currentUser.Following.RemoveAll(string.IsNullOrEmpty);
            currentUser.Followers.RemoveAll(string.IsNullOrEmpty);

            await _usersService.UpdateAsync(currentUserID, currentUser);

            return NoContent();
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in Follow: {ex.Message}");
            Console.Error.WriteLine($"Stack Trace: {ex.StackTrace}");
            Console.Error.WriteLine($"CurrentID: {gameRequest.CurrentUserID}");
            Console.Error.WriteLine($"GameID: {gameRequest.GameData}");
            return StatusCode(500, "Internal Server Error");
        }
    }
}