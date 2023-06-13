using backend_asp_net_core.Data;
using backend_asp_net_core.Enums;
using backend_asp_net_core.Models;
using backend_asp_net_core.Requests;
using backend_asp_net_core.Responses;
using Microsoft.AspNetCore.Authorization;
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
            //var applicant = _dbContext.Users.Find(request.Applicant_id);
            if (applicant == null)
            {
                return _generalResponse.SendError("Applicant ID not found", ResponseStatus.NOT_FOUND, null);
            }
            //_logger.LogInformation(applicant);

            return _generalResponse.SendResponse("Success", null);
        }
    }
}
