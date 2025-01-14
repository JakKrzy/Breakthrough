using Microsoft.EntityFrameworkCore;
using Service.Models;

namespace Service.Context
{
    public class BreakthroughDbContext : DbContext
    {
        public BreakthroughDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Room>()
                .HasOne(m => m.Player1)
                .WithOne()
                .HasForeignKey<Room>(m => m.Player1Id);
            modelBuilder.Entity<Room>()
                .HasOne(m => m.Player2)
                .WithOne()
                .HasForeignKey<Room>(m => m.Player2Id);
        }
    }
}
