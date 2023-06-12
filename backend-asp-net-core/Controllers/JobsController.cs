using backend_asp_net_core.Data;
using backend_asp_net_core.Enums;
using backend_asp_net_core.Models;
using backend_asp_net_core.Requests;
using backend_asp_net_core.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;

namespace backend_asp_net_core.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GeneralResponse _generalResponse;
        private readonly UserManager<IdentityUser> _userManager;

        public JobsController(UserManager<IdentityUser> userManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _generalResponse = new GeneralResponse();
        }

        [HttpGet]
        public IActionResult Get()
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var jobs = _dbContext.Jobs.OrderByDescending(j => j.Id).ToList();
            return _generalResponse.SendResponse("Jobs retrieved", jobs);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var job = _dbContext.Jobs.Find(id);

            if (job == null)
            {
                return _generalResponse.SendError("Job not found", ResponseStatus.NOT_FOUND, null);
            }
            return _generalResponse.SendResponse("Job retrieved", job);
        }

        [HttpPost]
        public IActionResult Create(JobRequest request)
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var job = new Job(
                    request.Title,
                    request.Description,
                    request.Salary,
                    request.Location,
                    request.Postcode,
                    request.JobType,
                    user.Id
                );

            _dbContext.Jobs.Add(job);
            _dbContext.SaveChanges();

            var createdJob = _dbContext.Jobs.FirstOrDefault(j => j.Id == job.Id);

            return _generalResponse.SendResponse("Job created successfully", createdJob);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, JobRequest request)
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var findJob = _dbContext.Jobs.Find(id);
            if (findJob == null)
            {
                return _generalResponse.SendError("Job not found", ResponseStatus.NOT_FOUND, null);
            }

            if (findJob.User_id != user.Id)
            {
                return _generalResponse.SendError("Can only update a job you created", ResponseStatus.UNAUTHORIZED, null);
            }

            findJob.Title = request.Title;
            findJob.Description = request.Description;
            findJob.Salary = request.Salary;
            findJob.Location = request.Location;
            findJob.Postcode = request.Postcode;
            findJob.JobType = request.JobType;

            _dbContext.SaveChanges();

            return _generalResponse.SendResponse("Job updated", findJob);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var job = _dbContext.Jobs.Find(id);

            if (job == null)
            {
                return _generalResponse.SendError("Job ID not found", ResponseStatus.NOT_FOUND, null);
            }

            if (job.User_id != user.Id)
            {
                return _generalResponse.SendError("Can only update a job you created", ResponseStatus.UNAUTHORIZED, null);
            }

            _dbContext.Jobs.Remove(job);
            _dbContext.SaveChanges();

            return _generalResponse.SendResponse("Job deleted", null);
        }
    }

}
