using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Spaces.DAL.Data;
using Spaces.DAL.Entities;
using Spaces.DAL.Interfaces;

namespace Spaces.DAL.Repositories;

public class LikesRepository : ILikesRepository
{
    private readonly SpacesContext _context;

    public LikesRepository(SpacesContext context)
    {
        _context = context;
    }
    
    
    public async Task CreateLikeForPostAsync(int sourceUserId, int targetPostId)
    {
        await _context.LikesForPosts.AddAsync(new LikeForPost
        {
            SourceUserId = sourceUserId,
            TargetPostId = targetPostId
        });
    }

    public async Task DeleteLikeForPostAsync(int sourceUserId, int targetPostId)
    {
        var like =  await _context.LikesForPosts.FirstOrDefaultAsync(like => 
            like.SourceUserId == sourceUserId && like.TargetPostId == targetPostId);

        if (like != null)
        {
            _context.LikesForPosts.Remove(like);
        }
    }
    
    public async Task CreateLikeForCommentAsync(int sourceUserId, int targetCommentId)
    {
        await _context.LikesForComments.AddAsync(new LikeForComment()
        {
            SourceUserId = sourceUserId,
            TargetCommentId = targetCommentId
        });
    }

    public async Task DeleteLikeForCommentAsync(int sourceUserId, int targetCommentId)
    {
        var like =  await _context.LikesForComments.FirstOrDefaultAsync(like => 
            like.SourceUserId == sourceUserId && like.TargetCommentId == targetCommentId);

        if (like != null)
        {
            _context.LikesForComments.Remove(like);
        }
    }
}