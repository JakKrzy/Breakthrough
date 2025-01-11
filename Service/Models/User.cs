using System.ComponentModel.DataAnnotations;

namespace Service.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Nickname {  get; set; }
        public string? Password { get; set; }
    }
}
