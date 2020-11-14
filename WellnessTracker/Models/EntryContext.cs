using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WellnessTracker.Models
{
    public class EntryContext : DbContext
    {

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string connection =
                    "server=localhost;" +
                    "port=3306;" +
                    "user=root;" +
                    "database=wellness-tracker;";
                string version = "10.4.14-MariaDB";
                optionsBuilder.UseMySql(connection, x => x.ServerVersion(version));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            string allergenEntryKeyName = "FK_" + nameof(Allergen) + "_" + nameof(Allergen_Entry);
            string entryAllergenKeyName = "FK_" + nameof(Models.Entry) + "_" + nameof(Allergen_Entry);
            //string authorKeyName = "FK_" + nameof(Author) + "_" + nameof(Book);

            ///////////////////////
            // Allergen
            ///////////////////////
            modelBuilder.Entity<Allergen>(entity => {

                entity.Property(e => e.Name)
                .HasCharSet("utf8mb4")
                .HasCollation("utf8mb4_general_ci");

            });


            ///////////////////////
            // Allergen_Entry
            ///////////////////////
            modelBuilder.Entity<Allergen_Entry>(entity => {

                entity.HasIndex(e => e.AllergenID).HasName(allergenEntryKeyName);

                entity.HasOne(thisEntity => thisEntity.Allergen)
                .WithMany(parent => parent.AllergenEntries)
                .HasForeignKey(thisEntity => thisEntity.AllergenID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName(allergenEntryKeyName);

                entity.HasIndex(e => e.EntryID).HasName(entryAllergenKeyName);

                entity.HasOne(thisEntity => thisEntity.Entry)
                .WithMany(parent => parent.EntryAllergens)
                .HasForeignKey(thisEntity => thisEntity.EntryID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName(entryAllergenKeyName);

            });

        }



    }
}
