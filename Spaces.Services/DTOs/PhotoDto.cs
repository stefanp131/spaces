using Microsoft.AspNetCore.Http;

namespace Spaces.Services.DTOs
{
    public class PhotoDto
    {
        public IFormFile File { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
    }
}