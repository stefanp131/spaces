using System;
using System.Threading.Tasks;
using AutoMapper;
using Spaces.DAL.Entities;
using Spaces.DAL.Interfaces;
using Spaces.Services.DTOs;
using Spaces.Services.Interfaces;

namespace Spaces.Services.Services;

public class CommentService: ICommentService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICommentRepository _commentRepository;
    private readonly IMapper _mapper;

    public CommentService(IUnitOfWork unitOfWork, ICommentRepository commentRepository, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _commentRepository = commentRepository;
        _mapper = mapper;
    }
    
    public async Task<CommentDto> CreateCommentAsync(CreateCommentDto createCommentDto)
    {
        var comment = _mapper.Map<Comment>(createCommentDto);
        comment.DateCreated = DateTime.UtcNow;
        
        await _commentRepository.CreateCommentAsync(comment);

        await _unitOfWork.Complete();

        return _mapper.Map<CommentDto>(comment);
    }

    public async Task UpdateCommentAsync(UpdateCommentDto updateCommentDto)
    {
        var comment = await _commentRepository.GetByIdAsync(updateCommentDto.Id);
        _mapper.Map(updateCommentDto, comment);
        
        await _unitOfWork.Complete();    
    }


    public async Task DeleteCommentAsync(int commentId)
    {
        await _commentRepository.DeleteCommentByIdAsync(commentId);
        await _unitOfWork.Complete();
    }
}
