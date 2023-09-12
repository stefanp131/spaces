using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spaces.Services.DTOs;
using Spaces.Services.Interfaces;

namespace Spaces.API.Controllers
{
    [Authorize]
    public class UserController : BaseApiController
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await this.userService.GetUserByIdAsync(id);
            
            if(user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}