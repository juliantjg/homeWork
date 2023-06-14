using backend_asp_net_core.Data;
using backend_asp_net_core.Models;
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
        public async Task<IActionResult> Get(int id)
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

        }
    }
}