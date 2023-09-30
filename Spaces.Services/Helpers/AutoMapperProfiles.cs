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
        CreateMap<AppUser, ProfileDto>();
        CreateMap<ProfileDto, AppUser>();
        CreateMap<CreateCommentDto, Comment>();
        CreateMap<Comment, CommentDto>().ForMember(
            d => d.CreatedBy, 
            o => o.MapFrom((src => src.User.UserName))
        );
        CreateMap<CreatePostDto, Post>();
        CreateMap<UpdatePostDto, Post>();
        CreateMap<PostDto, Post>();
        CreateMap<Post, PostDto>().ForMember(
            d => d.CreatedBy, 
            o => o.MapFrom((src => src.User.UserName))
        );;
        CreateMap<LikeForPost, LikeForPostDto>();
        CreateMap<LikeForComment, LikeForCommentDto>();
        CreateMap<Follow, FollowDto>();
    }

}