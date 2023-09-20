using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Spaces.DAL.Data;
using Spaces.DAL.Entities;
using Spaces.DAL.Interfaces;

namespace Spaces.DAL.Repositories;

public class LikesForPostRepository : ILikesForPostRepository
{
    private readonly SpacesContext _context;

    public LikesForPostRepository(SpacesContext context)
    {
        _context = context;
    }
    
    
    public async Task CreateLikeAsync(int sourceUserId, int targetPostId)
    {
        await _context.LikesForPosts.AddAsync(new LikeForPost
        {
            SourceUserId = sourceUserId,
            TargetPostId = targetPostId
        });
    }

    public async Task DeleteLikeAsync(int sourceUserId, int targetPostId)
    {
        var like =  await _context.LikesForPosts.FirstOrDefaultAsync(like => like.SourceUserId == sourceUserId && like.TargetPostId == targetPostId);
        _context.LikesForPosts.Remove(like);
    }
}