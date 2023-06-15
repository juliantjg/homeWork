using backend_asp_net_core.Enums;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend_asp_net_core.Requests
{
    public class RegisterRequest
    {
        [Required]
        [AllowNull]
        public string Email { get; set; }
        [Required]
        [AllowNull]
        public string Password { get; set; }
        [Required]
        [AllowNull]
        public string FirstName { get; set; }
        [Required]
        [AllowNull]
        public string LastName { get; set; }
        [Required]
        [AllowNull]
        [EnumDataType(typeof(Role), ErrorMessage = "Invalid Role value")]
        public Role Role { get; set; }
    }
}
