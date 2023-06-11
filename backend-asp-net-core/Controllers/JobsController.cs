using backend_asp_net_core.Data;
using backend_asp_net_core.Enums;
using backend_asp_net_core.Models;
using backend_asp_net_core.Requests;
using backend_asp_net_core.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend_asp_net_core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GeneralResponse _generalResponse;

        public JobsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _generalResponse = new GeneralResponse();
        }

        [HttpGet]
        public IActionResult Get()
        {
            var jobs = _dbContext.Jobs.OrderByDescending(j => j.Id).ToList();
            return _generalResponse.SendResponse("Jobs retrieved", jobs);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var job = _dbContext.Jobs.Find(id);

            if (job == null)
            {
                return _generalResponse.SendError("Job not found", ResponseStatus.NOT_FOUND);
            }
            return _generalResponse.SendResponse("Job retrieved", job);
        }

        [HttpPost]
        public IActionResult Create(JobRequest request)
        {
            var job = new Job(
                    request.Title,
                    request.Description,
                    request.Salary,
                    request.Location,
                    request.Postcode,
                    request.JobType,
                    1
                );

            _dbContext.Jobs.Add(job);
            _dbContext.SaveChanges();

            var createdJob = _dbContext.Jobs.FirstOrDefault(j => j.Id == job.Id);

            return _generalResponse.SendResponse("Job created", createdJob);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, JobRequest request)
        {

            var job = new Job(
                    request.Title,
                    request.Description,
                    request.Salary,
                    request.Location,
                    request.Postcode,
                    request.JobType,
                    1
                );

            _dbContext.Entry(job).State = EntityState.Modified;
            _dbContext.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var job = _dbContext.Jobs.Find(id);

            if (job == null)
            {
                return NotFound();
            }

            _dbContext.Jobs.Remove(job);
            _dbContext.SaveChanges();

            return NoContent();
        }
    }

}
