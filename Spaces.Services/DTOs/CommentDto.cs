using System;

namespace Spaces.Services.DTOs;

public class CommentDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime DateCreated { get; set; }
    public int PostId { get; set; }
    public int UserId { get; set; }
}