

using Microsoft.EntityFrameworkCore;

namespace PackageTracking.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        public DbSet<Package> Packages { get; set; }
    }
}