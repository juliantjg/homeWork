using backend_asp_net_core.Data;
using backend_asp_net_core.Enums;
using backend_asp_net_core.Models;
using backend_asp_net_core.Requests;
using backend_asp_net_core.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend_asp_net_core.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class JobApplicationsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GeneralResponse _generalResponse;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<AuthController> _logger;

        public JobApplicationsController(UserManager<User> userManager, ApplicationDbContext dbContext, ILogger<AuthController> logger)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _generalResponse = new GeneralResponse();
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateJobApplication(JobApplicationRequest request)
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var job = _dbContext.Jobs.Find(request.Job_id);
            if (job == null)
            {
                return _generalResponse.SendError("Job ID not found", ResponseStatus.NOT_FOUND, null);
            }
            var applicant = await _userManager.FindByIdAsync(request.Applicant_id);
            if (applicant == null)
            {
                return _generalResponse.SendError("Applicant ID not found", ResponseStatus.NOT_FOUND, null);
            }
            if (applicant.Id != userId)
            {
                return _generalResponse.SendError("User does not match", ResponseStatus.UNAUTHORIZED, null);
            }

            var findJobApplications = _dbContext.JobApplications
                .Where(jobApplication => jobApplication.Applicant_id == applicant.Id && jobApplication.Job_id == job.Id).ToList();

            if (findJobApplications.Count > 0)
            {
                return _generalResponse.SendError("You have already applied! Job application status is: " + findJobApplications.FirstOrDefault().Status, ResponseStatus.BAD_REQUEST, null);
            }
            if (userId == job.User_id)
            {
                return _generalResponse.SendError("Cannot apply top self created jobs", ResponseStatus.BAD_REQUEST, null);
            }
            var newJobApplication = new JobApplication(
                    applicant.Id,
                    job.Id,
                    job.User_id,
                    JobApplicationStatus.PENDING
                );

            _dbContext.JobApplications.Add(newJobApplication);
            _dbContext.SaveChanges();
            //_logger.LogInformation(applicant);

            return _generalResponse.SendResponse("Success", newJobApplication);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJobApplicationStatus(int id, UpdateJobApplicationRequest request)
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var findJobApplication = _dbContext.JobApplications.Find(id);
            if (findJobApplication == null)
            {
                return _generalResponse.SendError("Job application not found", ResponseStatus.NOT_FOUND, null);
            }
            var job = _dbContext.Jobs.Find(findJobApplication.Job_id);
            if (userId != job.User_id)
            {
                return _generalResponse.SendError("Access denied. Not job owner", ResponseStatus.UNAUTHORIZED, null);
            }
            if (findJobApplication.Status == JobApplicationStatus.ACCEPTED || findJobApplication.Status == JobApplicationStatus.REJECTED)
            {
                return _generalResponse.SendError("Cannot update application status. Application is " + findJobApplication.Status, ResponseStatus.BAD_REQUEST, null);
            }

            findJobApplication.Status = request.Status;
            _dbContext.SaveChanges();

            return _generalResponse.SendResponse("Job application status updated successfuly", findJobApplication);
        }

        [HttpGet("all/{job_id}")]
        public async Task<IActionResult> GetAllJobApplications(int job_id)
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var job = _dbContext.Jobs.Find(job_id);
            if (job == null)
            {
                return _generalResponse.SendError("Job ID not found", ResponseStatus.NOT_FOUND, null);
            }
            if (userId != job.User_id)
            {
                return _generalResponse.SendError("You do not have permission", ResponseStatus.UNAUTHORIZED, null);
            }

            var findJobApplications = _dbContext.JobApplications
                .Where(jobApplication => jobApplication.Job_id == job_id).ToList();

            return _generalResponse.SendResponse("Job applications for selected job retrieved", findJobApplications);
        }

        [HttpGet("my-all/{type}")]
        public async Task<IActionResult> GetAssociatedJobApplications(string type)
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var jobApplications = _dbContext.JobApplications
                .Where(jobApplication => jobApplication.Applicant_id == userId).ToList();
            if (type == "creator-id")
            {
                jobApplications = _dbContext.JobApplications
                    .Where(jobApplication => jobApplication.Job_creator_id == userId).ToList();
            }

            return _generalResponse.SendResponse("Associated job applications fetched", jobApplications);
        }
    }
}
