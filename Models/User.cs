using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace backlogs.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id { get; set; }

    [BsonElement("username")]
    [JsonPropertyName("username")]
    public string? Username { get; set; } = null!;

    [BsonElement("email")]
    [JsonPropertyName("email")]
    public string? Email { get; set; } = null!;

    [BsonElement("password")]
    [JsonPropertyName("password")]
    public string? Password { get; set; } = null!;

    [BsonElement("firstName")]
    [JsonPropertyName("firstName")]
    public string? FirstName { get; set; } = null!;

    [BsonElement("lastName")]
    [JsonPropertyName("lastName")]
    public string? LastName { get; set; } = null!;

    [BsonElement("followers")]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonPropertyName("followers")]
    public List<string?>? Followers { get; set; } = null!;

    [BsonElement("following")]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonPropertyName("following")]
    public List<string?>? Following { get; set; } = null!;

    [BsonElement("games")]
    [JsonPropertyName("games")]
    public List<string?>? Games { get; set; } = null!;
}