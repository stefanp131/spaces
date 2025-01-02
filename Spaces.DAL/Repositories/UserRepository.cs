using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Spaces.DAL.Data;
using Spaces.DAL.Entities;
using Spaces.DAL.Interfaces;

namespace Spaces.DAL.Repositories;

public class UserRepository : IUsersRepository
{
    private readonly SpacesContext _context;
    private readonly UserManager<AppUser> _userManager;

    public UserRepository(SpacesContext context, UserManager<AppUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
        return await _context.Users
            .FirstOrDefaultAsync(user => user.Id == id);
    }

    public async Task<List<AppUser>> GetUsersAsync(string searchTerm)
    {
        return await _context.Users
            .Where(user => user.UserName.Contains(searchTerm))
            .Include("Posts")
            .Include("Posts.Comments")
            .Include("Posts.Comments.LikedByUsers")
            .Include("Posts.LikedByUsers")
            .Include("FollowedByUsers")
            .Include("FollowedByUsers.SourceUser")
            .AsNoTracking()
            .AsSplitQuery()
            .ToListAsync();
    }
    
    public async Task<List<AppUser>> GetFollowedUsersAsync(int id)
    {
        var followers = await _context.Followers
            .Where(follow => follow.SourceUserId == id)
            .Include("TargetUser")
            .Include("TargetUser.Posts")
            .Include("TargetUser.Posts.LikedByUsers")
            .Include("TargetUser.Posts.Comments")
            .Include("TargetUser.Posts.Comments.LikedByUsers")
            .Include("TargetUser.Posts.Comments.User")
            .Include("TargetUser.FollowedUsers")
            .Include("TargetUser.FollowedByUsers")
            .Select(follow => follow.TargetUser).ToListAsync();
        
        var sourceUser = await _context.Followers
            .Where(follow => follow.SourceUserId == id)
            .Include("SourceUser")
            .Include("SourceUser.Posts")
            .Include("SourceUser.Posts.LikedByUsers")
            .Include("SourceUser.Posts.Comments")
            .Include("SourceUser.Posts.Comments.LikedByUsers")
            .Include("SourceUser.Posts.Comments.User")
            .Include("SourceUser.FollowedUsers")
            .Include("SourceUser.FollowedByUsers")
            .Select(follow => follow.SourceUser)
            .FirstOrDefaultAsync();
        
        if (sourceUser != null) { followers.Add(sourceUser);}
            
        if (!followers.Any())
        {
            return new List<AppUser>();
        }

        return followers;
    }

    public async Task<List<Follow>> GetFollowedByUsersAsync(int id)
    {
        throw new NotImplementedException();
    }


    public async Task CreateFollowerAsync(int sourceUserId, int targetUserId)
    {
        await _context.Followers.AddAsync(new Follow()
        {
            SourceUserId = sourceUserId,
            TargetUserId = targetUserId
        });
    }

    public async Task DeleteFollowerAsync(int sourceUserId, int targetUserId)
    {
        var follow =  await _context.Followers.FirstOrDefaultAsync(follow => 
            follow.SourceUserId == sourceUserId && follow.TargetUserId == targetUserId);

        if (follow != null)
        {
            _context.Followers.Remove(follow);
        }
    }
}