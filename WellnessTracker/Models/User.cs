/*using System;
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
        [Column(TypeName = "int(10)")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Column(TypeName = "varchar(30)")]
        [Required]
        public string Username { get; set; }

        [Column(TypeName = "varchar(255)")]
        [Required]
        public string Password { get; set; }

        [Column(TypeName = "bool")]
        [Required]
        public string IsDiabetic { get; set; }

        [Column(TypeName = "datetime")]
        [Required]
        public DateTime Registered { get; set; }




    }
}
*/