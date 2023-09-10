namespace Spaces.Services.DTOs;

public class CreateCommentDto
{
    public string Title { get; set; }
    public string Content { get; set; }
    public int PostId { get; set; }
}