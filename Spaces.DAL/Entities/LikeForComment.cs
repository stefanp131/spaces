namespace Spaces.DAL.Entities;

public class LikeForComment
{
    public int Id { get; set; }
    public AppUser SourceUser { get; set; }
    public int SourceUserId { get; set; }
    public AppUser TargetUser { get; set; }
    public int TargetUserId { get; set; }
}