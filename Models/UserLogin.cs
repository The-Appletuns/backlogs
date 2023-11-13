using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace backlogs.Models;

[BsonIgnoreExtraElements]
public class UserLogin
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id { get; set; }

    [BsonElement("email")]
    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;

    [BsonElement("password")]
    [JsonPropertyName("password")]
    public string Password { get; set; } = null!;
}