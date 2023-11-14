using backlogs.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backlogs.Services;

public class UsersService
{
    private readonly IMongoCollection<User> _usersCollection;

    public UsersService(
        IOptions<BackLogsDatabaseSettings> backLogsDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            backLogsDatabaseSettings.Value.ConnectionString
        );

        var mongoDatabase = mongoClient.GetDatabase(
            backLogsDatabaseSettings.Value.DatabaseName
        );

        _usersCollection = mongoDatabase.GetCollection<User>(
            backLogsDatabaseSettings.Value.UserCollectionName
        );
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

}