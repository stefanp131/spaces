using System.Threading.Tasks;
using Spaces.Services.DTOs;

namespace Spaces.Services.Interfaces;

public interface ICommentService
{
    Task<CommentDto> CreateCommentAsync(CreateCommentDto createCommentDto);
    Task UpdateCommentAsync(UpdateCommentDto updateCommentDto);
    Task DeleteCommentAsync(int commentId);
    Task CreateLikeAsync(int sourceUserId, int targetCommentId);
    Task DeleteLikeAsync(int sourceUserId, int targetCommentId);
}