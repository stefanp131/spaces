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
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }
        
        [HttpGet()]
        public async Task<ActionResult<UserDto>> GetUsers()
        {
            var users = await this._userService.GetUsersAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await this._userService.GetUserByIdAsync(id);
            
            if(user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        
        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdateProfile(int id, [FromBody] ProfileDto profile)
        {
            await _userService.UpdateProfileAsync(id, profile);

            return Ok();
        }

        [HttpGet("{id}/profile")]
        public async Task<ActionResult<ProfileDto>> GetProfile(int id)
        {
            var profileDto = await _userService.GetProfileAsync(id);

            return Ok(profileDto);
        }
        
        [HttpPost("{id}/follow")]
        public async Task<IActionResult> Follow([FromBody] FollowDto followDto)
        {
             await _userService.CreateFollowerAsync(followDto.SourceUserId, followDto.TargetUserId);

            return Ok();
        }
        
        [HttpPost("{id}/unfollow")]
        public async Task<IActionResult> Unfollow([FromBody] FollowDto followDto)
        {
            await _userService.DeleteFollowerAsync(followDto.SourceUserId, followDto.TargetUserId);

            return Ok();
        }
        
    }
}