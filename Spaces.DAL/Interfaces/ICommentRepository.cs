using System.Threading.Tasks;
using Spaces.DAL.Entities;

namespace Spaces.DAL.Interfaces;

public interface ICommentRepository
{
    Task<Comment> GetByIdAsync(int commentId);
    Task CreateCommentAsync(Comment comment);

    Task DeleteCommentByIdAsync(int commentId);
}