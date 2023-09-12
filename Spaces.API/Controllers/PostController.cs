using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spaces.Services.DTOs;
using Spaces.Services.Interfaces;

namespace Spaces.API.Controllers;

[Authorize]
public class PostController : BaseApiController
{
    private readonly IPostService _postService;

    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    [HttpGet]
    public async Task<IActionResult> GetPostsAsync()
    {
        var postDtos = await _postService.GetPostsAsync();

        return Ok(postDtos);
    }
    
    
    [HttpPost]
    public async Task<IActionResult> CreatePostAsync([FromBody] CreatePostDto createPostDto)
    {
        await _postService.CreatePostAsync(createPostDto);
        
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePostAsync([FromBody] UpdatePostDto updatePostDto)
    {
        await _postService.UpdatePostAsync(updatePostDto);
        
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePostByIdAsync(int id)
    {
        await _postService.DeletePostAsync(id);

        return NoContent();
    }
}