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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
        }
    }
}
