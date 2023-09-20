using System.Threading.Tasks;

namespace Spaces.DAL.Interfaces;

public interface ILikesForPostRepository
{
    Task CreateLikeAsync(int sourceUserId, int targetPostId);
    Task DeleteLikeAsync(int sourceUserId, int targetPostId);
}