using System.ComponentModel.DataAnnotations;

namespace Service.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Player1Id { get; set; }
        public int? Player2Id { get; set; }
        public User Player1 { get; set; }
        public User Player2 { get; set; }
    }
}
