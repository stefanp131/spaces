using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Spaces.DAL.Entities;

public class AppUser : IdentityUser<int>
{
    public ICollection<AppUserRole> UserRoles { get; set; }
    public string ProfileImage { get; set; }
    public string AboutMe { get; set; }
    public ICollection<Follow> FollowedByUsers { get; set; }
    public ICollection<Follow> UsersIFollow { get; set; }
    public ICollection<Post> Posts { get; set; }
}