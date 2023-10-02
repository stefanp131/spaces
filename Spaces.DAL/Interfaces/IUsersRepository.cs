using System.Collections.Generic;
using System.Threading.Tasks;
using Spaces.DAL.Entities;

namespace Spaces.DAL.Interfaces;

public interface IUsersRepository
{
    Task<AppUser> GetUserByIdAsync(int id);
    Task<List<AppUser>> GetUsersAsync(string searchTerm);
    Task CreateFollowerAsync(int sourceUserId, int targetUserId);
    Task DeleteFollowerAsync(int sourceUserId, int targetUserId);
    Task<List<AppUser>> GetFollowedUsersAsync(int id);
    Task<List<Follow>> GetFollowedByUsersAsync(int id);
}