namespace Spaces.Services.DTOs;

public class FollowDto
{
    public int Id { get; set; }
    public UserDto SourceUser { get; set; }
    public int SourceUserId { get; set; }
    public UserDto TargetUser { get; set; }
    public int TargetUserId { get; set; }
}