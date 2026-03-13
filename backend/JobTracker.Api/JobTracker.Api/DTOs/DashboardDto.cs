namespace JobTracker.Api.Dtos
{
    public class DashboardDto
    {
        public int TotalApplications { get; set; }
        public int Interviews { get; set; }
        public int Offers { get; set; }
        public int Rejected { get; set; }
        public double ResponseRate { get; set; }

        public int ApplicationsThisWeek { get; set; }

        public List<RecentApplicationDto> RecentApplications { get; set; } = new();
        public List<FollowUpDto> FollowUps { get; set; } = new();

        public Dictionary<string, int> StatusBreakdown { get; set; } = new();
    }

    public class RecentApplicationDto
    {
        public string CompanyName { get; set; } = string.Empty;
        public string RoleTitle { get; set; } = string.Empty;
        public DateTime DateApplied { get; set; }
    }

    public class FollowUpDto
    {
        public string CompanyName { get; set; } = string.Empty;
        public string RoleTitle { get; set; } = string.Empty;
        public DateTime FollowUpDate { get; set; }
    }
}