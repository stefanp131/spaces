using System.Collections.Generic;
using System.Threading.Tasks;
using Spaces.DAL.Entities;

namespace Spaces.DAL.Interfaces;

public interface IUsersRepository
{
    Task<AppUser> GetUserByIdAsync(int id);
    Task<List<AppUser>> GetUsersAsync();
}