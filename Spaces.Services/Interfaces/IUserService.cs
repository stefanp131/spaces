﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Spaces.Services.DTOs;

namespace Spaces.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByIdAsync(int id);
        Task UpdateProfileAsync(int id, ProfileDto updateProfile);
        Task<ProfileDto> GetProfileAsync(int id);
    }
}
