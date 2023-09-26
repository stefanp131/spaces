using System.Collections.Generic;
using System.Threading.Tasks;
using Spaces.DAL.Entities;

namespace Spaces.DAL.Interfaces;

public interface IPostRepository
{
    Task<List<Post>> GetPostsAsync(int userId);

    Task<Post> GetByIdAsync(int postId);

    Task CreatePostAsync(Post post);
    Task DeletePostByIdAsync(int postId);
}