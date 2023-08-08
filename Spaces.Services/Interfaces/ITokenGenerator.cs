using System.Threading.Tasks;
using Spaces.DAL.Entities;

namespace Spaces.Services.Interfaces;

public interface ITokenGenerator
{
    Task<string> CreateToken(AppUser user);
}