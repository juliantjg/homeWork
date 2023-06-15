using backend_asp_net_core.Enums;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend_asp_net_core.Requests
{
    public class JobRequest
    {
        [Required]
        [AllowNull]
        public string Title { get; set; }
        [Required]
        [AllowNull]
        public string Description { get; set; }
        [AllowNull]
        [Range(20, 99, ErrorMessage = "Value must be greater than or equal to 20")]
        public float Salary { get; set; }
        [Required]
        [AllowNull]
        public string Location { get; set; }
        [Required]
        [AllowNull]
        public string Postcode { get; set; }
        [Required]
        [EnumDataType(typeof(JobType), ErrorMessage = "Invalid JobType value")]
        [AllowNull]
        public JobType JobType { get; set; }
    }
}
