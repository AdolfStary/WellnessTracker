using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WellnessTracker.Models
{
    //[Table("user")]
    public class ApplicationUser : IdentityUser
    {
       /* [Key]
        [Column(TypeName = "int(10)")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override string Id { get; set; }

        [Column(TypeName = "varchar(30)")]
        public override string UserName { get; set; }

        [Column(TypeName = "varchar(30)")]
        public override string PasswordHash { get; set; }

        [Column(TypeName = "bool")]
        [Required]
        public string IsDiabetic { get; set; }

        [Column(TypeName = "datetime")]
        [Required]
        public DateTime Registered { get; set; }

        [InverseProperty(nameof(Models.Entry.ApplicationUser))]
        public virtual ICollection<Entry> Entries { get; set; }*/

    }
}
