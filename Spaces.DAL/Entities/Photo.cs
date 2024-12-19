namespace Spaces.DAL.Entities
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
    }
}