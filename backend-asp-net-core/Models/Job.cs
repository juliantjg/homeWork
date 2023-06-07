using backend_asp_net_core.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace backend_asp_net_core.Models
{
    public class Job
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [AllowNull]
        public string Title { get; set; }
        [AllowNull]
        public string Description { get; set; }
        [AllowNull]
        [Range(20, 99, ErrorMessage = "Value must be greater than or equal to 20")]
        public float Salary { get; set; }
        [AllowNull]
        public string Location { get; set; }
        [AllowNull]
        public string Postcode { get; set; }
        [AllowNull]
        public JobType JobType { get; set; }
        [AllowNull]
        public int User_id { get; set; }
    }
}
