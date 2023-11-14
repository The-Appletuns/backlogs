using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backlogs.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace backlogs.Services;

public class UsersService
{
    private readonly IMongoCollection<User> _usersCollection;
    private readonly string key;

    public UsersService(IConfiguration configuration)
    {
        var mongoClient = new MongoClient(configuration.GetConnectionString("BackLogsDb"));

        var mongoDatabase = mongoClient.GetDatabase("UserData");

        _usersCollection = mongoDatabase.GetCollection<User>("UserInfo");

        this.key = configuration.GetSection("JwtKey").ToString();
    }

    public async Task<List<User>> GetAsync() =>
        await _usersCollection.Find(_ => true).ToListAsync();

    public async Task<User?> GetAsync(string id) =>
        await _usersCollection.Find(x => x.id == id).FirstOrDefaultAsync();
    
    public async Task CreateAsync(User newUser) =>
        await _usersCollection.InsertOneAsync(newUser);

    public async Task UpdateAsync(string id, User updatedUser) =>
        await _usersCollection.ReplaceOneAsync(x => x.id == id, updatedUser);
    
    public async Task RemoveAsync(string id) =>
        await _usersCollection.DeleteOneAsync(x => x.id == id);


    public string? Authenticate(string email, string password)
    {
        var user = this._usersCollection.Find(x => x.Email == email && x.Password == password).FirstOrDefault();

        if (user == null)
        {
            return null;
        }

        var tokenHandler = new JwtSecurityTokenHandler();

        var tokenKey = Encoding.ASCII.GetBytes(key);

        var tokenDescriptor = new SecurityTokenDescriptor() {

            Subject = new ClaimsIdentity(new Claim[]{
                new Claim(ClaimTypes.Email, email),
            }),

            Expires = DateTime.UtcNow.AddHours(1),

            SigningCredentials = new SigningCredentials (
                new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature
            )
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    public User? GetUserFromEmail(string email)
    {
        var user = this._usersCollection.Find(x => x.Email == email).FirstOrDefault();

        return user;
    }

}