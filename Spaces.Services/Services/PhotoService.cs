using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Spaces.DAL.Entities;
using Spaces.DAL.Interfaces;
using Spaces.Services.Helpers;
using Spaces.Services.Interfaces;

namespace Spaces.Services.Services;

public class PhotoService : IPhotoService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<AppUser> _userManager;
    private readonly Cloudinary _cloudinary;
    public PhotoService(IOptions<CloudinarySettings> config, IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
    {
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
        
        _cloudinary = new Cloudinary(account);
    }
    
    public async Task AddPhotoAsync(IFormFile file, int userId)
    {
        var uploadedResult = new ImageUploadResult();
        
        if (file.Length > 0)
        {
            await using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                Folder = "Spaces"
            };

            uploadedResult = await _cloudinary.UploadAsync(uploadParams);
        }

        var user = await _userManager.Users.FirstAsync(user => user.Id == userId);
            
        user.Photos.Add(new Photo
        {
            PublicId = uploadedResult.PublicId,
            Url = uploadedResult.SecureUrl.AbsoluteUri
        });
        
        await _unitOfWork.Complete();
        
    }

    public async Task DeletePhotoAsync(int photoId, int userId)
    {
        var user = await _userManager.Users.Include(user => user.Photos).FirstAsync(user => user.Id == userId);
        var photo = user.Photos.FirstOrDefault(photo => photo.Id == photoId);

        if (photo != null && photo.PublicId != null)
        {
            
            var deletionParams = new DeletionParams(photo.PublicId);
            var result = await _cloudinary.DestroyAsync(deletionParams);
            
            if (result.Result == "ok")
            {  
                user.Photos.Remove(photo);
                await _unitOfWork.Complete();
            }
        }
    }
}