using System.Threading.Tasks;
using AutoMapper;
using Spaces.DAL.Entities;
using Spaces.DAL.Interfaces;
using Spaces.Services.DTOs;
using Spaces.Services.Interfaces;

namespace Spaces.Services.Services;

public class PostService: IPostService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPostRepository _postRepository;
    private readonly IMapper _mapper;

    public PostService(IUnitOfWork unitOfWork, IPostRepository postRepository, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _postRepository = postRepository;
        _mapper = mapper;
    }
    public async Task CreatePostAsync(CreatePostDto createPostDto)
    {
        var post = _mapper.Map<Post>(createPostDto);

        await _postRepository.CreatePostAsync(post);
        await _unitOfWork.Complete();
    }

    public async Task UpdatePostAsync(UpdatePostDto updatePostDto)
    {
        var post = await _postRepository.GetByIdAsync(updatePostDto.Id);
        _mapper.Map(updatePostDto, post);
        
        await _unitOfWork.Complete();
    }

    public async Task DeletePostAsync(int postId)
    {
        await _postRepository.DeletePostByIdAsync(postId);
        
        await _unitOfWork.Complete();
    }
}