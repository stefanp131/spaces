using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Spaces.DAL.Entities;

public class AppUser : IdentityUser<int>
{
    public ICollection<AppUserRole> UserRoles { get; set; }
    public string ProfileImage { get; set; }
    public string AboutMe { get; set; }
    public ICollection<Follow> FollowedByUsers { get; set; }
    public ICollection<Follow> FollowedUsers { get; set; }
    public ICollection<Post> Posts { get; set; }
    public ICollection<Comment> Comments { get; set; }
    public ICollection<LikeForPost> PostsILike { get; set; }
    public ICollection<LikeForComment> CommentsILike { get; set; }

}