using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WellnessTracker.Models
{
    [Table("entry")]
    public class Entry
    {
        [Key]
        [Column(TypeName = "int(10)")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Column(TypeName = "int(10)")]
        [Required]
        public int CategoryID { get; set; }

        [Column(TypeName = "varchar(36)")]
        [Required]
        public string UserID { get; set; }

        [Column(TypeName = "int(10)")]
        [Required]
        public int StatusID { get; set; }

        [Column(TypeName = "datetime")]
        [Required]
        public DateTime Time { get; set; }

        [Column(TypeName = "int(4)")]
        public int Carbs { get; set; }

        [Column(TypeName = "int(4)")]
        public int Protein { get; set; }

        [Column(TypeName = "int(4)")]
        public int Fats { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string Notes { get; set; }

        [Column(TypeName = "double(5, 1)")]
        public double Insulin { get; set; }

        [Column(TypeName = "double(5, 1)")]
        public double BG { get; set; }

        [Column(TypeName = "bool")]
        public bool IsArchived { get; set; }

        [ForeignKey(nameof(StatusID))]
        [InverseProperty(nameof(Models.Status.Entries))]
        public virtual Status EntryStatus { get; set; }

        [ForeignKey(nameof(CategoryID))]
        [InverseProperty(nameof(Models.Category.Entries))]
        public virtual Category EntryCategory { get; set; }

        [ForeignKey(nameof(UserID))]
        [InverseProperty(nameof(Models.User.Entries))]
        public virtual User ApplicationUser { get; set; }


        [InverseProperty(nameof(Models.Allergen_Entry.Entry))]
        public virtual ICollection<Allergen_Entry> EntryAllergens { get; set; }

        public Entry()
        {

        }

        public Entry(int categoryID, int statusID, DateTime time, int carbs, int protein, int fats, string notes, double insulin, double bg)
        {
            CategoryID = categoryID;
            StatusID = statusID;
            Time = time;
            Carbs = carbs;
            Protein = protein;
            Fats = fats;
            Notes = notes;
            Insulin = insulin;
            BG = bg;
            IsArchived = false;
        }
    }
}
