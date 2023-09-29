namespace Spaces.DAL.Entities;

public class LikeForComment
{
    public int Id { get; set; }
    public AppUser SourceUser { get; set; }
    public int SourceUserId { get; set; }
    public Comment TargetComment { get; set; }
    public int TargetCommentId { get; set; }
}