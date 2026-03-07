using JobTracker.Api.Entities;

namespace JobTracker.Api.DTOs
{
    public class JobApplicationResponse
    {
        public Guid Id { get; set; }

        // DETAILS
        public string CompanyName { get; set; } = string.Empty;
        public string RoleTitle { get; set; } = string.Empty;
        public ApplicationStatus Status { get; set; }
        public DateTime DateApplied { get; set; }

        // JOB
        public string Location { get; set; } = string.Empty;
        public WorkType WorkType { get; set; }
        public decimal? SalaryMin { get; set; }
        public decimal? SalaryMax { get; set; }
        public string? JobUrl { get; set; }

        // CONTACT
        public string? RecruiterName { get; set; }
        public string? RecruiterEmail { get; set; }
        public string? RecruiterPhone { get; set; }

        // FOLLOW UP
        public DateTime? FollowUpDate { get; set; }
        public string? Notes { get; set; }

        // SYSTEM
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
