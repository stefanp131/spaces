using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Spaces.DAL.Data;
using Spaces.DAL.Entities;
using Spaces.DAL.Interfaces;

namespace Spaces.DAL.Repositories;

public class CommentRepository : ICommentRepository
{
    private readonly SpacesContext _context;

    public CommentRepository(SpacesContext context)
    {
        _context = context;
    }

    public async Task<Comment> GetByIdAsync(int commentId)
    {
        return await _context.Comments
            .Where(comment => comment.Id == commentId)
            .Include("User")
            .Include("LikedByUsers")
            .FirstAsync();
    }

    public async Task CreateCommentAsync(Comment comment)
    {
        await _context.Comments.AddAsync(comment);
    }

    public async Task DeleteCommentByIdAsync(int commentId)
    {
        var comment = await _context.Comments.FindAsync(commentId);

        if (comment != null)
        {
            _context.Comments.Remove(comment);
        }
    }
}