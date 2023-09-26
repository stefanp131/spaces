using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Spaces.DAL.Data;
using Spaces.DAL.Entities;
using Spaces.DAL.Interfaces;

namespace Spaces.DAL.Repositories;

public class PostRepository: IPostRepository
{
    private readonly SpacesContext _context;

    public PostRepository(SpacesContext context)
    {
        _context = context;
    }

    public async Task<List<Post>> GetPostsAsync(int userId)
    {
        return await _context.Posts
            .Where(post => post.UserId == userId)
            .Include(post => post.LikedByUsers)
            .Include(post => post.Comments)
                .ThenInclude(comment => comment.User )
            .Include(post => post.User)
            .ToListAsync();
    }

    public async Task<Post> GetByIdAsync(int postId)
    {
        return await _context.Posts.Where(post => post.Id == postId).Include(post => post.User).FirstAsync();
    }

    public async Task CreatePostAsync(Post post)
    {
        await _context.Posts.AddAsync(post);
    }

    public async Task DeletePostByIdAsync(int postId)
    {
        var post = await _context.Posts.FindAsync(postId);

        if (post != null)
        {
            _context.Posts.Remove(post);
        }
    }
}