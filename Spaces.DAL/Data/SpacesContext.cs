using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Spaces.DAL.Entities;

namespace Spaces.DAL.Data;

public class SpacesContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>,
    AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }

    public DbSet<LikeForPost> LikesForPosts { get; set; }
    public DbSet<LikeForComment> LikesForComments { get; set; }


    public SpacesContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // for future entity configurations and validations
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        builder.Entity<AppUser>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.User)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();

        builder.Entity<AppRole>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.Role)
            .HasForeignKey(ur => ur.RoleId)
            .IsRequired();
        
        builder.Entity<Follow>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.UsersIFollow)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Follow>()
            .HasOne(s => s.TargetUser)
            .WithMany(l => l.FollowedByUsers)
            .HasForeignKey(s => s.TargetUserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Entity<LikeForPost>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.PostsILike)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<LikeForPost>()
            .HasOne(s => s.TargetPost)
            .WithMany(l => l.LikedByUsers)
            .HasForeignKey(s => s.TargetPostId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Entity<LikeForComment>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.CommentsILike)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<LikeForComment>()
            .HasOne(s => s.TargetComment)
            .WithMany(l => l.LikedByUsers)
            .HasForeignKey(s => s.TargetCommentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}