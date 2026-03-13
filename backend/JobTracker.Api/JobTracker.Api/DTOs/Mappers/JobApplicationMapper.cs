using JobTracker.Api.DTOs;
using JobTracker.Api.Entities;

namespace JobTracker.Api.Mappers
{
    public static class JobApplicationMapper
    {
        public static JobApplication ToEntity(CreateJobApplicationRequest request)
        {
            return new JobApplication
            {
                CompanyName = request.CompanyName,
                RoleTitle = request.RoleTitle,
                Status = request.Status,
                DateApplied = request.DateApplied,

                Location = request.Location,
                WorkType = request.WorkType,
                SalaryMin = request.SalaryMin,
                SalaryMax = request.SalaryMax,
                JobUrl = request.JobUrl,

                RecruiterName = request.RecruiterName,
                RecruiterEmail = request.RecruiterEmail,
                RecruiterPhone = request.RecruiterPhone,

                FollowUpDate = request.FollowUpDate,
                Notes = request.Notes
            };
        }

        public static JobApplicationResponse ToResponse(JobApplication entity)
        {
            return new JobApplicationResponse
            {
                Id = entity.Id,
                CompanyName = entity.CompanyName,
                RoleTitle = entity.RoleTitle,
                Status = entity.Status,
                DateApplied = entity.DateApplied,

                Location = entity.Location,
                WorkType = entity.WorkType,
                SalaryMin = entity.SalaryMin,
                SalaryMax = entity.SalaryMax,
                JobUrl = entity.JobUrl,

                RecruiterName = entity.RecruiterName,
                RecruiterEmail = entity.RecruiterEmail,
                RecruiterPhone = entity.RecruiterPhone,

                FollowUpDate = entity.FollowUpDate,
                Notes = entity.Notes
            };
        }

        public static void UpdateEntity(JobApplication entity, UpdateJobApplicationRequest request)
        {
            entity.CompanyName = request.CompanyName;
            entity.RoleTitle = request.RoleTitle;
            entity.Status = request.Status;

            entity.Location = request.Location;
            entity.WorkType = request.WorkType;
            entity.SalaryMin = request.SalaryMin;
            entity.SalaryMax = request.SalaryMax;
            entity.JobUrl = request.JobUrl;

            entity.RecruiterName = request.RecruiterName;
            entity.RecruiterEmail = request.RecruiterEmail;
            entity.RecruiterPhone = request.RecruiterPhone;

            entity.FollowUpDate = request.FollowUpDate;
            entity.Notes = request.Notes;
        }
    }
}