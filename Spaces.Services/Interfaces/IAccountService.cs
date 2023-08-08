using System.Threading.Tasks;
using Spaces.Services.DTOs;

namespace Spaces.Services.Interfaces;

public interface IAccountService
{
    Task<AccountDto> LoginAsync(LoginDto loginDto);
    Task<AccountDto> RegisterAsync(RegisterDto registerDto);
}