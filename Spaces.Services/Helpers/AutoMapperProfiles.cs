using AutoMapper;
using Spaces.DAL.Entities;
using Spaces.Services.DTOs;

namespace Spaces.Services.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<RegisterDto, AppUser>();
        CreateMap<AppUser, UserDto>();
    }

}