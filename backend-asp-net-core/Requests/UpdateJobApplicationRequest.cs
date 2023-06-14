using backend_asp_net_core.Enums;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend_asp_net_core.Requests
{
    public class UpdateJobApplicationRequest
    {
        [Required]
        [AllowNull]
        public JobApplicationStatus Status { get; set; }
    }
}
