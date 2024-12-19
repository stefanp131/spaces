using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Spaces.Services.Interfaces;

public interface IPhotoService
{
    Task AddPhotoAsync(IFormFile file, int userId);
    Task DeletePhotoAsync(int photoId, int userId);
}