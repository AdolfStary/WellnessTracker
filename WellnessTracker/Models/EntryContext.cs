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
                    "database=wellnesstracker-data;";
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
            // Status
            ///////////////////////
            modelBuilder.Entity<Status>(entity => {

                entity.Property(e => e.Name)
                .HasCharSet("utf8mb4")
                .HasCollation("utf8mb4_general_ci");

            });

            ///////////////////////
            // Category
            ///////////////////////
            modelBuilder.Entity<Category>(entity => {

                entity.Property(e => e.Name)
                .HasCharSet("utf8mb4")
                .HasCollation("utf8mb4_general_ci");

            });

            ///////////////////////
            // Application User
            ///////////////////////
            modelBuilder.Entity<User>(entity => {

                entity.Property(e => e.Username)
                .HasCharSet("utf8mb4")
                .HasCollation("utf8mb4_general_ci");


                entity.Property(e => e.Password)
                .HasCharSet("utf8mb4")
                .HasCollation("utf8mb4_general_ci");

            });

            ///////////////////////
            // Entry
            ///////////////////////
            modelBuilder.Entity<Entry>(entity => {

                string categoryKeyName = "FK_" + nameof(Category) + "_" + nameof(Models.Entry);
                string userKeyName = "FK_" + nameof(User) + "_" + nameof(Models.Entry);
                string statusKeyName = "FK_" + nameof(Status) + "_" + nameof(Models.Entry);

                entity.Property(e => e.Notes)
                .HasCharSet("utf8mb4")
                .HasCollation("utf8mb4_general_ci");

                entity.HasIndex(e => e.CategoryID).HasName(categoryKeyName);
                entity.HasOne(thisEntity => thisEntity.EntryCategory)
                .WithMany(parent => parent.Entries)
                .HasForeignKey(thisEntity => thisEntity.CategoryID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName(categoryKeyName);

                entity.HasIndex(e => e.UserID).HasName(userKeyName);
                entity.HasOne(thisEntity => thisEntity.ApplicationUser)
                .WithMany(parent => parent.Entries)
                .HasForeignKey(thisEntity => thisEntity.UserID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName(userKeyName);

                entity.HasIndex(e => e.StatusID).HasName(statusKeyName);
                entity.HasOne(thisEntity => thisEntity.EntryStatus)
                .WithMany(parent => parent.Entries)
                .HasForeignKey(thisEntity => thisEntity.StatusID)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName(statusKeyName);

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
