using backend_asp_net_core.Data;
using backend_asp_net_core.Enums;
using backend_asp_net_core.Models;
using backend_asp_net_core.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Humanizer.In;

namespace backend_asp_net_core.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GeneralResponse _generalResponse;
        private readonly UserManager<User> _userManager;

        public UsersController(UserManager<User> userManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _generalResponse = new GeneralResponse();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var findUser = await _userManager.FindByIdAsync(id);
            if (findUser == null)
            {
                return _generalResponse.SendError("User ID not found", ResponseStatus.NOT_FOUND, null);
            }

            return _generalResponse.SendResponse("User retrieved", findUser);
        }

        [HttpGet]
        public async Task<IActionResult> HomeData()
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            if (user.Role == Role.EMPLOYER)
            {
                int numJobsPostedByCurrUser = _dbContext.Jobs
                    .Where(
                            job => job.User_id == userId
                     ).ToList().Count();
                int numSuccessfulApplications = _dbContext.JobApplications
                    .Where(
                            jobApplication => jobApplication.Job_creator_id == userId
                            &&
                            jobApplication.Status == JobApplicationStatus.ACCEPTED
                     ).ToList().Count();
                int numPendingApplications = _dbContext.JobApplications
                    .Where(
                            jobApplication => jobApplication.Job_creator_id == userId
                            &&
                            jobApplication.Status == JobApplicationStatus.PENDING
                     ).ToList().Count();

                var homeData = new
                {
                    numJobsPostedByCurrUser = numJobsPostedByCurrUser,
                    numSuccessfulApplications = numSuccessfulApplications,
                    numPendingApplications = numPendingApplications
                };
                return _generalResponse.SendResponse("Home data retrieved for employer", homeData);
            }
            else
            {
                int numSuccessfulApplications = _dbContext.JobApplications
                    .Where(
                            jobApplication => jobApplication.Applicant_id == userId
                            &&
                            jobApplication.Status == JobApplicationStatus.ACCEPTED
                     ).ToList().Count();
                int numPendingApplications = _dbContext.JobApplications
                    .Where(
                            jobApplication => jobApplication.Applicant_id == userId
                            &&
                            jobApplication.Status == JobApplicationStatus.PENDING
                     ).ToList().Count();

                var homeData = new
                {
                    numSuccessfulApplications = numSuccessfulApplications,
                    numPendingApplications = numPendingApplications
                };
                return _generalResponse.SendResponse("Home data retrieved for job seeker", homeData);
            } 
        }
    }
}