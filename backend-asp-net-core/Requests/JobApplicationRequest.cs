using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend_asp_net_core.Requests
{
    public class JobApplicationRequest
    {
        [Required]
        [AllowNull]
        public string Applicant_id { get; set; }

        [Required]
        [AllowNull]
        public int Job_id { get; set; }
    }
}
