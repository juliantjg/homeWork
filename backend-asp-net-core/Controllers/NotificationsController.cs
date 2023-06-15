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
    public class NotificationsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GeneralResponse _generalResponse;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<AuthController> _logger;

        public NotificationsController(UserManager<User> userManager, ApplicationDbContext dbContext, ILogger<AuthController> logger)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _generalResponse = new GeneralResponse();
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            /** Fetch user from request */
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = _userManager.FindByIdAsync(userId).Result;

            var notifications = _dbContext.Notifications
                .Where(notification => notification.User_id == userId).ToList();

            return _generalResponse.SendResponse("Notifications retrieved", notifications);
        }
    }
}
