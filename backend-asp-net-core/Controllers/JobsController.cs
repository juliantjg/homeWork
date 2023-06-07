using backend_asp_net_core.Data;
using backend_asp_net_core.Models;
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

        public JobsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Job>> Get()
        {
            var jobs = _dbContext.Jobs.ToList();
            return Ok(jobs);
        }

        [HttpGet("{id}")]
        public ActionResult<Job> GetById(int id)
        {
            var job = _dbContext.Jobs.Find(id);

            if (job == null)
            {
                return NotFound();
            }

            return Ok(job);
        }

        [HttpPost]
        public ActionResult<Job> Create(Job job)
        {
            _dbContext.Jobs.Add(job);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = job.Id }, job);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Job job)
        {
            if (id != job.Id)
            {
                return BadRequest();
            }

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
