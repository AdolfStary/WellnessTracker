using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WellnessTracker.Models
{
    public class EntryContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Entry> Entries { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<Allergen> Allergens { get; set; }
        public virtual DbSet<Allergen_Entry> Allergen_Entries { get; set; }
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
                
                entity.HasData(
                        new Allergen()
                        {
                            ID = -1,
                            Name = "Egg"
                        }, 
                        new Allergen()
                        {
                            ID = -2,
                            Name = "Milk"
                        }, 
                        new Allergen()
                        {
                            ID = -3,
                            Name = "Tree Nuts"
                        }, 
                        new Allergen()
                        {
                            ID = -4,
                            Name = "Shellfish"
                        }, 
                        new Allergen()
                        {
                            ID = -5,
                            Name = "Soy"
                        }, 
                        new Allergen()
                        {
                            ID = -6,
                            Name = "Wheat"
                        }, 
                        new Allergen()
                        {
                            ID = -7,
                            Name = "Peanut"
                        }, 
                        new Allergen()
                        {
                            ID = -8,
                            Name = "Seeds"
                        },
                        new Allergen()
                        {
                            ID = -9,
                            Name = "Fish"
                        }, 
                        new Allergen()
                        {
                            ID = -10,
                            Name = "Gluten"
                        }

                    );
            });

            ///////////////////////
            // Status
            ///////////////////////
            modelBuilder.Entity<Status>(entity =>
            {

                entity.Property(e => e.Name)
                .HasCharSet("utf8mb4")
                .HasCollation("utf8mb4_general_ci");
                
                entity.HasData(
                        new Status()
                        {
                            ID = -10,
                            Name = "Normal",
                            IsPositive = true
                        },
                        new Status()
                        {
                            ID = -9,
                            Name = "Happy",
                            IsPositive = true
                        },
                        new Status()
                        {
                            ID = -8,
                            Name = "Relaxed",
                            IsPositive = true
                        },
                        new Status()
                        {
                            ID = -7,
                            Name = "Energetic",
                            IsPositive = true
                        },
                        new Status()
                        {
                            ID = -6,
                            Name = "Excited",
                            IsPositive = true
                        },
                        new Status()
                        {
                            ID = -5,
                            Name = "Sick",
                            IsPositive = false
                        }, 
                        new Status()
                        {
                            ID = -4,
                            Name = "Sad",
                            IsPositive = false
                        }, 
                        new Status()
                        {
                            ID = -3,
                            Name = "Stressed",
                            IsPositive = false
                        },
                        new Status()
                        {
                            ID = -2,
                            Name = "Anxious",
                            IsPositive = false
                        }, 
                        new Status()
                        {
                            ID = -1,
                            Name = "Tired",
                            IsPositive = false
                        }
                    );
            });

            ///////////////////////
            // Category
            ///////////////////////
            modelBuilder.Entity<Category>(entity => {

                entity.Property(e => e.Name)
                .HasCharSet("utf8mb4")
                .HasCollation("utf8mb4_general_ci");
                
                entity.HasData(
                       new Category()
                       {
                           ID = -5,
                           Name = "Meal",
                           IsDiabetic = false
                       },
                       new Category()
                       {
                           ID = -4,
                           Name = "Exercise",
                           IsDiabetic = false
                       },
                       new Category()
                       {
                           ID = -3,
                           Name = "Event",
                           IsDiabetic = false
                       },
                       new Category()
                       {
                           ID = -2,
                           Name = "BG Reading",
                           IsDiabetic = true
                       },
                       new Category()
                       {
                           ID = -1,
                           Name = "Insulin Injection",
                           IsDiabetic = true
                       });
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
                
                entity.HasData(
                    new User() 
                    { 
                        ID = "fca0f3e8-dae4-45d9-ad10-345257364235",
                        Username = "Adolf",
                        Password = "6346c10aad3dd848f542060024022522ac86f9d7e13dbf39bb8a2252228c794e",
                        IsDiabetic = true,
                        Registered = DateTime.Now
                    }, 
                    new User()
                    {
                        ID = "77c8faaa-62f2-4993-96b2-48587cba72a3",
                        Username = "Ummer",
                        Password = "a7b5c820d7a015504cb09776d23899e3f1e392e349916329a70ce3562d38565f",
                        IsDiabetic = false,
                        Registered = DateTime.Now
                    }

                    );

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
                
                entity.HasData(
                    new Entry(-5, "fca0f3e8-dae4-45d9-ad10-345257364235", -10, DateTime.Now, 40, 20, 15, "Feeling pretty good today, had Eggs and toast for breakfast.", 2.5, 9.4, 0) { ID = -1},
                    new Entry(-5, "fca0f3e8-dae4-45d9-ad10-345257364235", -8, DateTime.Now, 20, 50, 35, "Went out for dinner, had chicken, toast and potatoes, big glass of milk.", 1.25, 7.8, 0) { ID = -2 },
                    new Entry(-4, "fca0f3e8-dae4-45d9-ad10-345257364235", -10, DateTime.Now, 0, 0, 0, "Hardcore exercise", 0, 0, 50) { ID = -3 },
                    new Entry(-4, "fca0f3e8-dae4-45d9-ad10-345257364235", -10, new DateTime(2020, 11, 10), 0, 0, 0, "Starting to exercise, taking it easy", 0, 0, 20) { ID = -4 },
                    new Entry(-3, "fca0f3e8-dae4-45d9-ad10-345257364235", -6, new DateTime(2020, 11, 15), 0, 0, 0, "Got a new job, pretty awesome", 0, 5.6, 0) { ID = -5 },
                    new Entry(-2, "fca0f3e8-dae4-45d9-ad10-345257364235", -2, new DateTime(2020, 11, 19), 0, 0, 0, "Felt strange, tested blood sugar, low reading", 0, 3.7, 0) { ID = -6 },
                    new Entry(-1, "fca0f3e8-dae4-45d9-ad10-345257364235", -1, new DateTime(2020, 11, 22), 0, 0, 0, "Felt very exhausted, tested blood sugar, high reading, took correction", 2.2, 19.8, 0) { ID = -7 },
                    new Entry(-5, "77c8faaa-62f2-4993-96b2-48587cba72a3", -10, DateTime.Now, 80, 33, 28, "Endluged in some fast food after excercising", 0, 0, 0) { ID = -8 },
                    new Entry(-5, "77c8faaa-62f2-4993-96b2-48587cba72a3", -2, DateTime.Now, 20, 45, 35, "I'm stressed, running out of bacon. Gotta go shopping soon.", 0, 0, 0) { ID = -9 },
                    new Entry(-4, "77c8faaa-62f2-4993-96b2-48587cba72a3", -7, new DateTime(2020, 11, 22), 0, 0, 0, "Regular exercise, bench, legs, running", 0, 0, 60) { ID = -10 },
                    new Entry(-3, "77c8faaa-62f2-4993-96b2-48587cba72a3", -6, new DateTime(2020, 11, 23), 0, 0, 0, "Found awesome new exercise: https://www.verywellfit.com/the-plank-exercise-3120068", 0, 0, 0) { ID = -11 },
                    new Entry(-4, "77c8faaa-62f2-4993-96b2-48587cba72a3", -1, new DateTime(2020, 11, 24), 0, 0, 0, "Tried the new plank exercise, pretty brutal", 0, 0, 15) { ID = -12 }
                    );

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
