// 
// String data request for ids
// 

public class FollowRequest
{
    public required string CurrentUserID { get; set; }
    public required string FollowingUserID { get; set; }
}