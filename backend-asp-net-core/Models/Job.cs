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
        public float Salary { get; set; }
        [AllowNull]
        public string Location { get; set; }
        [AllowNull]
        public string Postcode { get; set; }
        [AllowNull]
        public JobType JobType { get; set; }

        [AllowNull]
        public int User_id { get; set; }

        public Job(string title, string description, float salary, string location, string postcode, JobType jobType, int user_id)
        {
            Title = title;
            Description = description;
            Salary = salary;
            Location = location;
            Postcode = postcode;
            JobType = jobType;
            User_id = user_id;
        }
    }
}
