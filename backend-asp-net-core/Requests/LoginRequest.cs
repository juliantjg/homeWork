using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend_asp_net_core.Requests
{
    public class LoginRequest
    {
        [Required]
        [AllowNull]
        public string Email { get; set; }
        [Required]
        [AllowNull]
        public string Password { get; set; }
    }
}
