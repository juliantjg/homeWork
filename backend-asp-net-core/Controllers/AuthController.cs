using backend_asp_net_core.Data;
using backend_asp_net_core.Models;
using backend_asp_net_core.Requests;
using backend_asp_net_core.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend_asp_net_core.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly GeneralResponse _generalResponse;
        private readonly ILogger<AuthController> _logger;
        private readonly ApplicationDbContext _dbContext;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration
            , ILogger<AuthController> logger, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _generalResponse = new GeneralResponse();
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return _generalResponse.SendError("Invalid credentials", Enums.ResponseStatus.UNAUTHORIZED, null);
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
            {
                return _generalResponse.SendError("Invalid credentials", Enums.ResponseStatus.UNAUTHORIZED, null);
            }

            var token = GenerateJwtToken(user);

            var loginBundle = new
            {
                token = token,
                user_id = user.Id,
            };

            return _generalResponse.SendResponse("Login successful", loginBundle);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginRequest model)
        {
            var user = new User
            {
                UserName = model.Email,
                Email = model.Email
            };
            user.EmailConfirmed = true;

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return _generalResponse.SendError("Validation Error", Enums.ResponseStatus.BAD_REQUEST, result.Errors);
            }

            var token = GenerateJwtToken(user);
            return _generalResponse.SendResponse("Register successful", token);
        }

        private string GenerateJwtToken(IdentityUser user)
        {
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryInMinutes"])),
                signingCredentials: credentials
            );

            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return token;
        }
    }

}
