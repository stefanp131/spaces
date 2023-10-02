using System.Collections.Generic;
using System.Threading.Tasks;
using Spaces.Services.DTOs;

namespace Spaces.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDto>> GetUsersAsync(string searchTerm);
        Task<UserDto> GetUserByIdAsync(int id);
        Task UpdateProfileAsync(int id, ProfileDto updateProfile);
        Task<ProfileDto> GetProfileAsync(int id);
        Task CreateFollowerAsync(int sourceUserId, int targetUserId);
        Task DeleteFollowerAsync(int sourceUserId, int targetUserId);
        Task<List<UserDto>> GetFollowedUsersAsync(int id);
        Task<List<FollowDto>> GetFollowedByUsersAsync(int id);
    }
}
