namespace Spaces.Services.DTOs;

public class LikeForCommentDto
{
    public int SourceUserId { get; set; }
    public int TargetCommentId { get; set; }
}