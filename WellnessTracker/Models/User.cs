using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WellnessTracker.Models
{
    [Table("user")]
    public class User
    {
        [Key]
        [Column(TypeName = "varchar(40)")]
        public string ID { get; set; }

        [Column(TypeName = "varchar(30)")]
        [Required]
        public string Username { get; set; }

        [Column(TypeName = "varchar(64)")]
        [Required]
        public string Password { get; set; }

        [Column(TypeName = "bool")]
        [Required]
        public bool IsDiabetic { get; set; }

        [Column(TypeName = "datetime")]
        [Required]
        public DateTime Registered { get; set; }

        [InverseProperty(nameof(Models.Entry.ApplicationUser))]
        public virtual ICollection<Entry> Entries { get; set; }
        public User()
        {

        }

        public User(string id, string username, string password, bool isDiabetic)
        {
            ID = id;
            Username = username;
            Password = password;
            IsDiabetic = isDiabetic;
            Registered = DateTime.Now;
        }
    }
}
