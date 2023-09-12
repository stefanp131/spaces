using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spaces.Services.DTOs;
using Spaces.Services.Interfaces;

namespace Spaces.API.Controllers;

[Authorize]
public class CommentController : BaseApiController
{
    private readonly ICommentService _commentService;

    public CommentController(ICommentService commentService)
    {
        _commentService = commentService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCommentAsync([FromBody] CreateCommentDto createCommentDto)
    {
        await _commentService.CreateCommentAsync(createCommentDto);

        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCommentAsync([FromBody] UpdateCommentDto updateCommentDto)
    {
        await _commentService.UpdateCommentAsync(updateCommentDto);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCommentByIdAsync(int id)
    {
        await _commentService.DeleteCommentAsync(id);

        return NoContent();
    }
}