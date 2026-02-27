using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JobTracker.Api.Data;
using JobTracker.Api.Entities;
using Microsoft.EntityFrameworkCore;
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

        // GET: api/JobApplications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplicationResponse>>> GetAll()
        {
            var apps = await _context.JobApplications
                .OrderByDescending(a => a.DateApplied)
                
                .Select(a => new JobApplicationResponse
                {
                    Id = a.Id,
                    CompanyName = a.CompanyName,
                    RoleTitle = a.RoleTitle,
                    Location = a.Location,
                    Status = a.Status,
                    SalaryMin = a.SalaryMin,
                    SalaryMax = a.SalaryMax,
                    Notes = a.Notes,
                    DateApplied = a.DateApplied
                })

                .ToListAsync();

            return Ok(apps);
        }

        // POST: api/JobApplications/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<JobApplication>> GetById(Guid id)
        {
            var app = await _context.JobApplications.FindAsync(id);
            if (app == null)
                return NotFound();
            return Ok(app);
        }

        // POST: api/JobApplications
        [HttpPost]
        public async Task<ActionResult<JobApplicationResponse>> Create(CreateJobApplicationRequest request)
        {
            var entity = new JobApplication
            {
                Id = Guid.NewGuid(),
                CompanyName = request.CompanyName,
                RoleTitle = request.RoleTitle,
                Location = request.Location,
                Status = request.Status,
                SalaryMin = request.SalaryMin,
                SalaryMax = request.SalaryMax,
                Notes = request.Notes,
                DateApplied = DateTime.UtcNow
            };

            _context.JobApplications.Add(entity);
            await _context.SaveChangesAsync();

            var response = new JobApplicationResponse
            {
                Id = entity.Id,
                CompanyName = entity.CompanyName,
                RoleTitle = entity.RoleTitle,
                Location = entity.Location,
                Status = entity.Status,
                SalaryMin = entity.SalaryMin,
                SalaryMax = entity.SalaryMax,
                Notes = entity.Notes,
                DateApplied = entity.DateApplied
            };

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, response);
        }

        // PUT: api/JobApplications/{id}
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

            await _context.SaveChangesAsync();


            var response = new JobApplicationResponse
            {
                Id = entity.Id,
                CompanyName = entity.CompanyName,
                RoleTitle = entity.RoleTitle,
                Location = entity.Location,
                Status = entity.Status,
                SalaryMin = entity.SalaryMin,
                SalaryMax = entity.SalaryMax,
                Notes = entity.Notes,
                DateApplied = entity.DateApplied
            };

            return Ok(response);
        }

        // DELETE: api/JobApplications/{id}
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

        [HttpPatch("{id:guid}/status")]
        public async Task<ActionResult<JobApplication>> UpdateStatus(Guid id, UpdateStatusRequest request)
        {
            var existing = await _context.JobApplications.FindAsync(id);
            if (existing == null)
                return NotFound();
            existing.Status = request.Status;
            await _context.SaveChangesAsync();
            return Ok(existing);
        }
    }
}