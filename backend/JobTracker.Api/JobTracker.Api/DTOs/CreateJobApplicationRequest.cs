
using JobTracker.Api.Entities;

namespace JobTracker.Api.DTOs
{
    public class CreateJobApplicationRequest
    {
        public string CompanyName { get; set; } = string.Empty;
        public string RoleTitle { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public ApplicationStatus Status { get; set; }
        public DateTime DateApplied { get; set; }
        public decimal? SalaryMin { get; set; }
        public decimal? SalaryMax { get; set; } 
        public string? Notes { get; set; }
    }
}
