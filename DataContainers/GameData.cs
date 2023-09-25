using Ical.Net.DataTypes;

namespace backlogs;

public class GameData
{
    public string? Name { get; set; }

    public string[]? Systems { get; set; }

    public CalDateTime? DatePlayed { get; set; }
}