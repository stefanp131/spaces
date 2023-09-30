using System.Collections.Generic;

namespace Spaces.Services.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public List<PostDto> Posts { get; set; }
    public List<FollowDto> FollowedByUsers { get; set; } = new List<FollowDto>();
    public List<FollowDto> FollowedUsers { get; set; } = new List<FollowDto>();
    public string AboutMe { get; set; }
}