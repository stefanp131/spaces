using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Spaces.Services.DTOs;
using Spaces.Services.Interfaces;

namespace Spaces.API.SignalR;

public class SocialHub : Hub
{
    private readonly IPostService _postService;
    private readonly ICommentService _commentService;

    public SocialHub(IPostService postService, ICommentService commentService)
    {
        _postService = postService;
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

    // Post-related methods
    public async Task<PostDto> CreatePost(CreatePostDto createPostDto)
    {
        var post = await _postService.CreatePostAsync(createPostDto);
        await Clients.Others.SendAsync("PostCreated", post);

        return post;
    }

    public async Task DeletePost(int postId)
    {
        await _postService.DeletePostAsync(postId);
    }

    public async Task CreatePostLike(int sourceUserId, int targetPostId)
    {
        await _postService.CreateLikeAsync(sourceUserId, targetPostId);
    }

    public async Task DeletePostLike(int sourceUserId, int targetPostId)
    {
        await _postService.DeleteLikeAsync(sourceUserId, targetPostId);
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