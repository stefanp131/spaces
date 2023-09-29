using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Spaces.DAL.Interfaces;
using Spaces.Services.Interfaces;

namespace Spaces.API.SignalR;

public class PostsHub : Hub
{
    private readonly IPostService _postService;
    private readonly IUnitOfWork _unitOfWork;

    public PostsHub(IPostService postService, IUnitOfWork unitOfWork)
    {
        _postService = postService;
        _unitOfWork = unitOfWork;
    }

    public override async Task OnConnectedAsync()
    {
         await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        await base.OnDisconnectedAsync(exception);
    }

    public async Task CreatePostLike(int sourceUserId, int targetPostId)
    {
        await _postService.CreateLikeAsync(sourceUserId, targetPostId);
    }
    
    
    public async Task DeletePostLike(int sourceUserId, int targetPostId)
    {
        await _postService.DeleteLikeAsync(sourceUserId, targetPostId);
    }
}