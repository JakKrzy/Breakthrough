using System.ComponentModel.DataAnnotations;

namespace Service.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Nickname {  get; set; }
        public string? Password { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public List<Game>? WonGames { get; set; }
        public List<Game>? LostGames { get; set; }
    }
}
