using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WellnessTracker.Models
{
    [Table("status")]
    public class Status
    {
        [Key]
        [Column(TypeName = "int(10)")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string Name { get; set; }

        [Column(TypeName = "bool")]
        public bool IsPositive { get; set; }

        [InverseProperty(nameof(Models.Entry.EntryStatus))]
        public virtual ICollection<Entry> Entries { get; set; }

        public Status() { }
    }
}
