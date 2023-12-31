using System;
using System.Collections.Generic;

namespace Spaces.DAL.Entities;

public class Comment
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
    public int PostId { get; set; }
    public Post Post { get; set; }
    public int UserId { get; set; }
    public AppUser User { get; set; }
    public ICollection<LikeForComment> LikedByUsers { get; set; }
}