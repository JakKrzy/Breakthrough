using System.ComponentModel.DataAnnotations;

namespace Service.Models
{
    public class Game
    {
        [Key]
        public int Id { get; set; }
        public int WinnerId { get; set; }
        public int LoserId { get; set; }
        public User Winner { get; set; }
        public User Loser { get; set; }
        public DateTime Date { get; set; }
    }
}
