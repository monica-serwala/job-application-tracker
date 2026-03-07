
using System;
namespace JobTracker.Api.Entities
{
    public class JobApplication
    {
        public Guid Id { get; set; }

        // ======================
        // DETAILS TAB
        // ======================
        public string CompanyName { get; set; } = string.Empty;
        public string RoleTitle { get; set; } = string.Empty;
        public ApplicationStatus Status { get; set; }
        public DateTime DateApplied { get; set; }

        // ======================
        // JOB TAB
        // ======================
        public string Location { get; set; } = string.Empty;
        public WorkType WorkType { get; set; }
        public decimal? SalaryMin { get; set; }
        public decimal? SalaryMax { get; set; }
        public string? JobUrl { get; set; }

        // ======================
        // CONTACT TAB
        // ======================
        public string? RecruiterName { get; set; }
        public string? RecruiterEmail { get; set; }
        public string? RecruiterPhone { get; set; }

        // ======================
        // FOLLOW UP TAB
        // ======================
        public DateTime? FollowUpDate { get; set; }
        public string? Notes { get; set; }

        // ======================
        // SYSTEM FIELDS
        // ======================
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

    }
}
