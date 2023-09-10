using System;

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
}