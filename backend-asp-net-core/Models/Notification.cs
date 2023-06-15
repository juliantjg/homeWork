using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend_asp_net_core.Models
{
    public class Notification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [AllowNull]
        public string Description { get; set; }
        [AllowNull]
        public string User_id { get; set; }

        public Notification(string description, string user_id)
        {
            Description = description;
            User_id = user_id;
        }
    }
}
