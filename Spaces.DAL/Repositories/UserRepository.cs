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
            .Include(user => user.Posts)
            .ThenInclude(post => post.LikedByUsers)
            .ToListAsync();
    }
}