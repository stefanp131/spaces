using System.Collections.Generic;
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

    public async Task<List<AppUser>> GetUsersAsync()
    {
        return await _context.Users
            .Include(user => user.Posts)
                .ThenInclude(post => post.Comments)
                .ThenInclude(comment => comment.LikedByUsers)
            .Include(user => user.Posts)
                .ThenInclude(post => post.LikedByUsers)
            .Include(user => user.FollowedByUsers)
            .Include(user => user.FollowedUsers)
            .AsNoTracking()
            .AsSplitQuery()
            .ToListAsync();
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