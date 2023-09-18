using System.Collections.Generic;
using System.Threading.Tasks;
using Spaces.Services.DTOs;

namespace Spaces.Services.Interfaces;

public interface IPostService
{
    Task<List<PostDto>> GetPostsAsync();
    Task<PostDto> CreatePostAsync(CreatePostDto createPostDto);
    Task UpdatePostAsync(UpdatePostDto updatePostDto);
    Task DeletePostAsync(int postId);
}