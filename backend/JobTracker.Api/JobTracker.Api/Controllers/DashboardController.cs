using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobTracker.Api.Data;
using JobTracker.Api.Dtos;
using JobTracker.Api.Entities;

namespace JobTracker.Api.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly JobTrackerDbContext _context;

        public DashboardController(JobTrackerDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<DashboardDto>> GetDashboard()
        {
            var applications = await _context.JobApplications.ToListAsync();

            var totalApplications = applications.Count;

            var interviews = applications.Count(a => a.Status == ApplicationStatus.Interviewing);
            var offers = applications.Count(a => a.Status == ApplicationStatus.Offer);
            var rejected = applications.Count(a => a.Status == ApplicationStatus.Rejected);

            double responseRate = 0;

            if (totalApplications > 0)
            {
                responseRate = Math.Round((double)interviews / totalApplications * 100, 2);
            }

            var oneWeekAgo = DateTime.UtcNow.AddDays(-7);

            var applicationsThisWeek = applications
                .Count(a => a.DateApplied >= oneWeekAgo);

            var recentApplications = applications
                .OrderByDescending(a => a.CreatedAt)
                .Take(5)
                .Select(a => new RecentApplicationDto
                {
                    CompanyName = a.CompanyName,
                    RoleTitle = a.RoleTitle,
                    DateApplied = a.DateApplied
                })
                .ToList();

            var followUps = applications
                .Where(a => a.FollowUpDate != null && a.FollowUpDate >= DateTime.UtcNow)
                .OrderBy(a => a.FollowUpDate)
                .Take(5)
                .Select(a => new FollowUpDto
                {
                    CompanyName = a.CompanyName,
                    RoleTitle = a.RoleTitle,
                    FollowUpDate = a.FollowUpDate!.Value
                })
                .ToList();

            var statusBreakdown = applications
                .GroupBy(a => a.Status)
                .ToDictionary(
                    g => g.Key.ToString(),
                    g => g.Count()
                );

            var dashboard = new DashboardDto
            {
                TotalApplications = totalApplications,
                Interviews = interviews,
                Offers = offers,
                Rejected = rejected,
                ResponseRate = responseRate,
                ApplicationsThisWeek = applicationsThisWeek,
                RecentApplications = recentApplications,
                FollowUps = followUps,
                StatusBreakdown = statusBreakdown
            };

            return Ok(dashboard);
        }
    }
}