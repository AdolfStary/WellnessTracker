using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WellnessTracker.Models
{
    [Table("allergen")]
    public class Allergen
    {
        [Key]
        [Column(TypeName = "int(10)")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string Name { get; set; }

        [InverseProperty(nameof(Models.Allergen_Entry.Allergen))]
        public virtual ICollection<Allergen_Entry> AllergenEntries { get; set; }


    }
}
