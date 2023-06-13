using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using backend_asp_net_core.Enums;

namespace backend_asp_net_core.Models
{
    public class JobApplication
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [AllowNull]
        public string Applicant_id { get; set; }
        [AllowNull]
        public string Job_id { get; set; }
        [AllowNull]
        public string Job_creator_id { get; set; }
        [AllowNull]
        public JobApplicationStatus Status { get; set; }

        public JobApplication(int id, string applicant_id, string job_id, string job_creator_id, JobApplicationStatus status)
        {
            Id = id;
            Applicant_id = applicant_id;
            Job_id = job_id;
            Job_creator_id = job_creator_id;
            Status = status;
        }
    }
}
