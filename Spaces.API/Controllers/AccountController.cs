using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Spaces.Services.CustomExceptions;
using Spaces.Services.DTOs;
using Spaces.Services.Interfaces;

namespace Spaces.API.Controllers;

public class AccountController : BaseApiController
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AccountDto>> Login(LoginDto loginDto)
    {
        try
        {
            var accountDto = await _accountService.LoginAsync(loginDto);
            return Ok(accountDto);
        }
        catch (BadCredentialsException)
        {
            return Unauthorized("Wrong credentials");
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<AccountDto>> Register(RegisterDto registerDto)
    {
        try
        {
            var accountDto = await _accountService.RegisterAsync(registerDto);
            return Ok(accountDto);
        }
        catch (RegistrationFailed ex)
        {
            return BadRequest("RegistrationFailed " + ex.Message);
        }
    }


}