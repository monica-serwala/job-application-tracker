using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobTracker.Api.Data;
using JobTracker.Api.Entities;
using JobTracker.Api.DTOs;

namespace JobTracker.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationsController : ControllerBase
    {
        private readonly JobTrackerDbContext _context;

        public JobApplicationsController(JobTrackerDbContext context)
        {
            _context = context;
        }

        // ======================
        // ENTITY → RESPONSE DTO
        // ======================
        private static JobApplicationResponse ToResponse(JobApplication a)
        {
            return new JobApplicationResponse
            {
                Id = a.Id,
                CompanyName = a.CompanyName,
                RoleTitle = a.RoleTitle,
                Location = a.Location,
                Status = a.Status,
                DateApplied = a.DateApplied,
                SalaryMin = a.SalaryMin,
                SalaryMax = a.SalaryMax,
                Notes = a.Notes,
                JobUrl = a.JobUrl,
                WorkType = a.WorkType,

                RecruiterName = a.RecruiterName,
                RecruiterEmail = a.RecruiterEmail,
                RecruiterPhone = a.RecruiterPhone,
                FollowUpDate = a.FollowUpDate,

                CreatedAt = a.CreatedAt,
                UpdatedAt = a.UpdatedAt
            };
        }

        // ======================
        // GET ALL APPLICATIONS
        // ======================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplicationResponse>>> GetAll()
        {
            var apps = await _context.JobApplications
                .OrderByDescending(a => a.DateApplied)
                .ToListAsync();

            return Ok(apps.Select(ToResponse).ToList());
        }

        // ======================
        // GET APPLICATION BY ID
        // ======================
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<JobApplicationResponse>> GetById(Guid id)
        {
            var app = await _context.JobApplications.FindAsync(id);

            if (app == null)
                return NotFound();

            return Ok(ToResponse(app));
        }

        // ======================
        // CREATE APPLICATION
        // ======================
        [HttpPost]
        public async Task<ActionResult<JobApplicationResponse>> Create(CreateJobApplicationRequest request)
        {
            var entity = new JobApplication
            {
                CompanyName = request.CompanyName,
                RoleTitle = request.RoleTitle,
                Location = request.Location,
                Status = request.Status,
                SalaryMin = request.SalaryMin,
                SalaryMax = request.SalaryMax,
                Notes = request.Notes,
                JobUrl = request.JobUrl,
                WorkType = request.WorkType,

                RecruiterName = request.RecruiterName,
                RecruiterEmail = request.RecruiterEmail,
                RecruiterPhone = request.RecruiterPhone,
                FollowUpDate = request.FollowUpDate,

                DateApplied = request.DateApplied,
                CreatedAt = DateTime.UtcNow
            };

            _context.JobApplications.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(ToResponse(entity));
        }

        // ======================
        // UPDATE APPLICATION
        // ======================
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<JobApplicationResponse>> Update(Guid id, UpdateJobApplicationRequest request)
        {
            var entity = await _context.JobApplications.FindAsync(id);

            if (entity == null)
                return NotFound();

            entity.CompanyName = request.CompanyName;
            entity.RoleTitle = request.RoleTitle;
            entity.Location = request.Location;
            entity.Status = request.Status;
            entity.SalaryMin = request.SalaryMin;
            entity.SalaryMax = request.SalaryMax;
            entity.Notes = request.Notes;
            entity.JobUrl = request.JobUrl;
            entity.WorkType = request.WorkType;

            entity.RecruiterName = request.RecruiterName;
            entity.RecruiterEmail = request.RecruiterEmail;
            entity.RecruiterPhone = request.RecruiterPhone;
            entity.FollowUpDate = request.FollowUpDate;

            entity.DateApplied = request.DateApplied;
            entity.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(ToResponse(entity));
        }

        // ======================
        // DELETE APPLICATION
        // ======================
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var existing = await _context.JobApplications.FindAsync(id);

            if (existing == null)
                return NotFound();

            _context.JobApplications.Remove(existing);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ======================
        // UPDATE STATUS ONLY
        // ======================
        [HttpPatch("{id:guid}/status")]
        public async Task<ActionResult<JobApplicationResponse>> UpdateStatus(Guid id, UpdateStatusRequest request)
        {
            var existing = await _context.JobApplications.FindAsync(id);

            if (existing == null)
                return NotFound();

            existing.Status = request.Status;
            existing.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(ToResponse(existing));
        }

        // ======================
        // FOLLOW UPS
        // ======================
        [HttpGet("followups")]
        public async Task<ActionResult<IEnumerable<JobApplicationResponse>>> GetFollowUps()
        {
            var today = DateTime.UtcNow.Date;

            var followUps = await _context.JobApplications
                .Where(j => j.FollowUpDate != null && j.FollowUpDate <= today)
                .OrderBy(j => j.FollowUpDate)
                .ToListAsync();

            return Ok(followUps.Select(ToResponse).ToList());
        }
    }
}