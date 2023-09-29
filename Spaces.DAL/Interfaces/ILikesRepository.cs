using System.Threading.Tasks;

namespace Spaces.DAL.Interfaces;

public interface ILikesRepository
{
    Task CreateLikeForPostAsync(int sourceUserId, int targetPostId);
    Task DeleteLikeForPostAsync(int sourceUserId, int targetPostId);
    Task CreateLikeForCommentAsync(int sourceUserId, int targetCommentId);
    Task DeleteLikeForCommentAsync(int sourceUserId, int targetCommentId);
}