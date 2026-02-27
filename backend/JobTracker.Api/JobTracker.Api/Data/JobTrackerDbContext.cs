using Microsoft.EntityFrameworkCore;
using JobTracker.Api.Entities;

namespace JobTracker.Api.Data
{
    public class JobTrackerDbContext: DbContext
    {
        public JobTrackerDbContext(DbContextOptions<JobTrackerDbContext> options) : base(options)
        {
        }
        public DbSet<JobApplication> JobApplications { get; set; }
    }
}
