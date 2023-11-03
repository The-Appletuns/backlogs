using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace backlogs.Models;

public class Game
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id { get; set; }

    [BsonElement("game_id")]
    [JsonPropertyName("game_id")]
    public string GameID { get; set ; } = null!;

    [BsonElement("moby_url")]
    [JsonPropertyName("moby_url")]
    public string MobyUrl { get; set ; } = null!;

    [BsonElement("title")]
    [JsonPropertyName("title")]
    public string Title { get; set ; } = null!;
}