using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Spaces.DAL.Entities;
using Spaces.DAL.Interfaces;
using Spaces.Services.DTOs;
using Spaces.Services.Interfaces;

namespace Spaces.Services.Services;

public class PostService : IPostService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPostRepository _postRepository;
    private readonly ILikesRepository _likesRepository;
    private readonly IMapper _mapper;

    public PostService(IUnitOfWork unitOfWork, IPostRepository postRepository, ILikesRepository likesRepository, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _postRepository = postRepository;
        _likesRepository = likesRepository;
        _mapper = mapper;
    }

    public async Task<List<PostDto>> GetPostsForCurrentUserAsync(int userId)
    {
        var posts = await _postRepository.GetPostsAsync(userId);
        var postDtos = _mapper.Map<List<PostDto>>(posts);

        return postDtos;
    }

    public async Task<PostDto> GetPostByIdAsync(int id)
    {
        var post = await _postRepository.GetByIdAsync(id);
        var postDto = _mapper.Map<PostDto>(post);

        return postDto;
    }

    public async Task<PostDto> CreatePostAsync(CreatePostDto createPostDto)
    {
        var post = _mapper.Map<Post>(createPostDto);
        post.DateCreated = DateTime.UtcNow;
        post.DateUpdated = DateTime.UtcNow;

        await _postRepository.CreatePostAsync(post);

        await _unitOfWork.Complete();

        return _mapper.Map<PostDto>(await _postRepository.GetByIdAsync(post.Id));
    }

    public async Task<PostDto> UpdatePostAsync(UpdatePostDto updatePostDto)
    {
        var post = await _postRepository.GetByIdAsync(updatePostDto.Id);
        _mapper.Map(updatePostDto, post);
        post.DateUpdated = DateTime.UtcNow;

        await _unitOfWork.Complete();
        
        return _mapper.Map<PostDto>(post);

    }

    public async Task DeletePostAsync(int postId)
    {
        await _postRepository.DeletePostByIdAsync(postId);

        await _unitOfWork.Complete();
    }
    
    public async Task CreateLikeAsync(int sourceUserId, int targetPostId)
    {
        await _likesRepository.CreateLikeForPostAsync(sourceUserId, targetPostId);
        await _unitOfWork.Complete();
    }

    public async Task DeleteLikeAsync(int sourceUserId, int targetPostId)
    {
        await _likesRepository.DeleteLikeForPostAsync(sourceUserId, targetPostId);
        await _unitOfWork.Complete();
    }
}