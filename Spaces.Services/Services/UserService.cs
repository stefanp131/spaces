using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Spaces.DAL.Entities;
using Spaces.DAL.Interfaces;
using Spaces.Services.DTOs;
using Spaces.Services.Interfaces;

namespace Spaces.Services.Services;

public class UserService: IUserService
{
    private readonly IUsersRepository _usersRepository;
    private readonly UserManager<AppUser> _userManager;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IUsersRepository usersRepository,UserManager<AppUser> userManager, IMapper mapper, IUnitOfWork unitOfWork)
    {
        _usersRepository = usersRepository;
        _userManager = userManager;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<List<UserDto>> GetAllUsersAsync()
    {
        var users = await _usersRepository.GetAllUsersAsync();
        var userDtos = _mapper.Map<List<UserDto>>(users);

        return userDtos;
    }

    public async Task<UserDto> GetUserByIdAsync(int id)
    {
        var user = await _usersRepository.GetUserByIdAsync(id);
        var userDto = _mapper.Map<UserDto>(user);

        return userDto;
    }
    
    public async Task UpdateProfileAsync(int id, ProfileDto updateProfile)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
        _mapper.Map(updateProfile, user);

        await _unitOfWork.Complete();
    }

    public async Task<ProfileDto> GetProfileAsync(int id)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
        var profileDto = _mapper.Map<ProfileDto>(user);

        return profileDto;
    }
}