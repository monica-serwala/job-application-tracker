using System.ComponentModel.DataAnnotations;
using JobTracker.Api.Entities;

namespace JobTracker.Api.DTOs
{
    public class CreateJobApplicationRequest
    {
        // DETAILS
        [Required]
        public string CompanyName { get; set; } = string.Empty;
        [Required]
        public string RoleTitle { get; set; } = string.Empty;
        [Required]
        public ApplicationStatus Status { get; set; }
        [Required]
        public DateTime DateApplied { get; set; }

        // JOB
        public string Location { get; set; } = string.Empty;
        public WorkType WorkType { get; set; }
        public decimal? SalaryMin { get; set; }
        public decimal? SalaryMax { get; set; }
        public string? JobUrl { get; set; }

        // CONTACT
        public string? RecruiterName { get; set; }
        [EmailAddress]
        public string? RecruiterEmail { get; set; }
        public string? RecruiterPhone { get; set; }

        // FOLLOW-UP
        public DateTime? FollowUpDate { get; set; }
        public string? Notes { get; set; }


    }
}
