using System.Collections.Generic;

namespace Spaces.Services.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    public List<PostDto> Posts { get; set; }
}