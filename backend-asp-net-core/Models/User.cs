using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Identity;
using backend_asp_net_core.Enums;

namespace backend_asp_net_core.Models
{
    public class User : IdentityUser
    {
        [AllowNull]
        public string FirstName { get; set; }
        [AllowNull]
        public string LastName { get; set; }
        [AllowNull]
        public Role Role { get; set; }
    }
}
