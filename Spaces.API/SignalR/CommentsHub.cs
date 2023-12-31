using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Spaces.Services.DTOs;
using Spaces.Services.Interfaces;

namespace Spaces.API.SignalR;

public class CommentsHub : Hub
{
    private readonly ICommentService _commentService;

    public CommentsHub(ICommentService commentService)
    {
        _commentService = commentService;
    }
    
    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        return base.OnDisconnectedAsync(exception);
    }
    
    public async Task<CommentDto> CreateComment(CreateCommentDto createCommentDto)
    {
        var comment = await _commentService.CreateCommentAsync(createCommentDto);
        await Clients.Others.SendAsync("CommentCreated", comment);

        return comment;
    }
    
    
    public async Task DeleteComment(int commentId)
    {
        await _commentService.DeleteCommentAsync(commentId);
    }
    
    public async Task CreateCommentLike(int sourceUserId, int targetCommentId)
    {
        await _commentService.CreateLikeAsync(sourceUserId, targetCommentId);
    }
    
    
    public async Task DeleteCommentLike(int sourceUserId, int targetCommentId)
    {
        await _commentService.DeleteLikeAsync(sourceUserId, targetCommentId);
    }
}