using System.Threading.Tasks;
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

    public async Task<Post> GetByIdAsync(int postId)
    {
        return await _context.Posts.FindAsync(postId);
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