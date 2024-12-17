using System.Collections.Generic;
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
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public UserService(IUsersRepository usersRepository, IMapper mapper, IUnitOfWork unitOfWork)
    {
        _usersRepository = usersRepository;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<List<UserDto>> GetUsersAsync(string searchTerm)
    {
        var users = await _usersRepository.GetUsersAsync(searchTerm);
        var userDtos = _mapper.Map<List<UserDto>>(users);

        return userDtos;
    }

    public async Task<UserDto> GetUserByIdAsync(int id)
    {
        var user = await _usersRepository.GetUserByIdAsync(id);
        var userDto = _mapper.Map<UserDto>(user);

        return userDto;
    }

    public async Task CreateFollowerAsync(int sourceUserId, int targetUserId)
    {
        await _usersRepository.CreateFollowerAsync(sourceUserId, targetUserId);
        await _unitOfWork.Complete();
    }

    public async Task DeleteFollowerAsync(int sourceUserId, int targetUserId)
    {
        await _usersRepository.DeleteFollowerAsync(sourceUserId, targetUserId);
        await _unitOfWork.Complete();
    }

    public async Task<List<UserDto>> GetFollowedUsersAsync(int id)
    {
        var followedUsers = await _usersRepository.GetFollowedUsersAsync(id);

        return _mapper.Map<List<UserDto>>(followedUsers);
    }

    public async Task<List<FollowDto>> GetFollowedByUsersAsync(int id)
    {
        var followedByUsers = await _usersRepository.GetFollowedByUsersAsync(id);

        return followedByUsers == null ? null : _mapper.Map<List<FollowDto>>(followedByUsers);
    }
}