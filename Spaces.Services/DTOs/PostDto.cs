using System;
using System.Collections.Generic;
using Spaces.DAL.Entities;

namespace Spaces.Services.DTOs;

public class PostDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateUpdated { get; set; }
    public List<CommentDto> Comments { get; set; }
    public int UserId { get; set; }
}