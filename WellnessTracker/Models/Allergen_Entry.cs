using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WellnessTracker.Models
{
    [Table("Allergen_Entry")]
    public class Allergen_Entry
    {
        [Key]
        [Column(TypeName = "int(10)")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }


        [Column(TypeName = "int(10)")]
        [Required]
        public int AllergenID { get; set; }

        [Column(TypeName = "int(10)")]
        [Required]
        public int EntryID { get; set; }

        [ForeignKey(nameof(AllergenID))]
        [InverseProperty(nameof(Models.Allergen.AllergenEntries))]
        public virtual Allergen Allergen { get; set; }

        [ForeignKey(nameof(EntryID))]
        [InverseProperty(nameof(Models.Entry.EntryAllergens))]
        public virtual Entry Entry { get; set; }

        public Allergen_Entry() { }

        public Allergen_Entry(int allergenID, int entryID)
        {
            AllergenID = AllergenID;
            EntryID = EntryID;
        }
    }
}
