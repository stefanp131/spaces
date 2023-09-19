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
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPostsByIdAsync(int id)
    {
        var postDto = await _postService.GetPostByIdAsync(id);

        return Ok(postDto);
    }

    [HttpPost]
    public async Task<ActionResult<PostDto>> CreatePostAsync([FromBody] CreatePostDto createPostDto)
    {
        var postDto = await _postService.CreatePostAsync(createPostDto);
        
        return Ok(postDto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PostDto>> UpdatePostAsync([FromBody] UpdatePostDto updatePostDto)
    {
        var postDto = await _postService.UpdatePostAsync(updatePostDto);
        
        return Ok(postDto);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePostByIdAsync(int id)
    {
        await _postService.DeletePostAsync(id);

        return NoContent();
    }
}