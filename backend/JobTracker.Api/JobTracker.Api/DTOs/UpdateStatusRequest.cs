
using JobTracker.Api.Entities;
namespace JobTracker.Api.DTOs
{
    public class UpdateStatusRequest
    {
        public ApplicationStatus Status { get; set; }
    }
}
