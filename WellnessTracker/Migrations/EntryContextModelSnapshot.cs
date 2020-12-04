﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WellnessTracker.Models;

namespace WellnessTracker.Migrations
{
    [DbContext(typeof(EntryContext))]
    partial class EntryContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("WellnessTracker.Models.Allergen", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(10)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(30)")
                        .HasAnnotation("MySql:CharSet", "utf8mb4")
                        .HasAnnotation("MySql:Collation", "utf8mb4_general_ci");

                    b.HasKey("ID");

                    b.ToTable("allergen");

                    b.HasData(
                        new
                        {
                            ID = -1,
                            Name = "Egg"
                        },
                        new
                        {
                            ID = -2,
                            Name = "Milk"
                        },
                        new
                        {
                            ID = -3,
                            Name = "Tree Nuts"
                        },
                        new
                        {
                            ID = -4,
                            Name = "Shellfish"
                        },
                        new
                        {
                            ID = -5,
                            Name = "Soy"
                        },
                        new
                        {
                            ID = -6,
                            Name = "Wheat"
                        },
                        new
                        {
                            ID = -7,
                            Name = "Peanut"
                        },
                        new
                        {
                            ID = -8,
                            Name = "Seeds"
                        },
                        new
                        {
                            ID = -9,
                            Name = "Fish"
                        },
                        new
                        {
                            ID = -10,
                            Name = "Gluten"
                        });
                });

            modelBuilder.Entity("WellnessTracker.Models.Allergen_Entry", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(10)");

                    b.Property<int>("AllergenID")
                        .HasColumnType("int(10)");

                    b.Property<int>("EntryID")
                        .HasColumnType("int(10)");

                    b.Property<bool>("isArchived")
                        .HasColumnType("bool");

                    b.HasKey("ID");

                    b.HasIndex("AllergenID")
                        .HasName("FK_Allergen_Allergen_Entry");

                    b.HasIndex("EntryID")
                        .HasName("FK_Entry_Allergen_Entry");

                    b.ToTable("Allergen_Entry");
                });

            modelBuilder.Entity("WellnessTracker.Models.Category", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(10)");

                    b.Property<bool>("IsDiabetic")
                        .HasColumnType("bool");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(30)")
                        .HasAnnotation("MySql:CharSet", "utf8mb4")
                        .HasAnnotation("MySql:Collation", "utf8mb4_general_ci");

                    b.HasKey("ID");

                    b.ToTable("category");

                    b.HasData(
                        new
                        {
                            ID = -5,
                            IsDiabetic = false,
                            Name = "Meal"
                        },
                        new
                        {
                            ID = -4,
                            IsDiabetic = false,
                            Name = "Exercise"
                        },
                        new
                        {
                            ID = -3,
                            IsDiabetic = false,
                            Name = "Event"
                        },
                        new
                        {
                            ID = -2,
                            IsDiabetic = true,
                            Name = "BG Reading"
                        },
                        new
                        {
                            ID = -1,
                            IsDiabetic = true,
                            Name = "Insulin Injection"
                        });
                });

            modelBuilder.Entity("WellnessTracker.Models.Entry", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(10)");

                    b.Property<double>("BG")
                        .HasColumnType("double(5, 1)");

                    b.Property<int>("Carbs")
                        .HasColumnType("int(4)");

                    b.Property<int>("CategoryID")
                        .HasColumnType("int(10)");

                    b.Property<int>("ExerciseLength")
                        .HasColumnType("int(3)");

                    b.Property<int>("Fats")
                        .HasColumnType("int(4)");

                    b.Property<double>("Insulin")
                        .HasColumnType("double(5, 1)");

                    b.Property<bool>("IsArchived")
                        .HasColumnType("bool");

                    b.Property<string>("Notes")
                        .HasColumnType("varchar(255)")
                        .HasAnnotation("MySql:CharSet", "utf8mb4")
                        .HasAnnotation("MySql:Collation", "utf8mb4_general_ci");

                    b.Property<int>("Protein")
                        .HasColumnType("int(4)");

                    b.Property<int>("StatusID")
                        .HasColumnType("int(10)");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime");

                    b.Property<string>("UserID")
                        .IsRequired()
                        .HasColumnType("varchar(36)");

                    b.HasKey("ID");

                    b.HasIndex("CategoryID")
                        .HasName("FK_Category_Entry");

                    b.HasIndex("StatusID")
                        .HasName("FK_Status_Entry");

                    b.HasIndex("UserID")
                        .HasName("FK_User_Entry");

                    b.ToTable("entry");

                    b.HasData(
                        new
                        {
                            ID = -1,
                            BG = 9.4000000000000004,
                            Carbs = 40,
                            CategoryID = -5,
                            ExerciseLength = 0,
                            Fats = 15,
                            Insulin = 2.5,
                            IsArchived = false,
                            Notes = "Feeling pretty good today, had Eggs and toast for breakfast.",
                            Protein = 20,
                            StatusID = -10,
                            Time = new DateTime(2020, 12, 4, 11, 51, 16, 190, DateTimeKind.Local).AddTicks(1662),
                            UserID = "fca0f3e8-dae4-45d9-ad10-345257364235"
                        },
                        new
                        {
                            ID = -2,
                            BG = 7.7999999999999998,
                            Carbs = 20,
                            CategoryID = -5,
                            ExerciseLength = 0,
                            Fats = 35,
                            Insulin = 1.25,
                            IsArchived = false,
                            Notes = "Went out for dinner, had chicken, toast and potatoes, big glass of milk.",
                            Protein = 50,
                            StatusID = -8,
                            Time = new DateTime(2020, 12, 4, 11, 51, 16, 190, DateTimeKind.Local).AddTicks(8675),
                            UserID = "fca0f3e8-dae4-45d9-ad10-345257364235"
                        },
                        new
                        {
                            ID = -3,
                            BG = 0.0,
                            Carbs = 0,
                            CategoryID = -4,
                            ExerciseLength = 50,
                            Fats = 0,
                            Insulin = 0.0,
                            IsArchived = false,
                            Notes = "Hardcore exercise",
                            Protein = 0,
                            StatusID = -10,
                            Time = new DateTime(2020, 12, 4, 11, 51, 16, 190, DateTimeKind.Local).AddTicks(8787),
                            UserID = "fca0f3e8-dae4-45d9-ad10-345257364235"
                        },
                        new
                        {
                            ID = -4,
                            BG = 0.0,
                            Carbs = 0,
                            CategoryID = -4,
                            ExerciseLength = 20,
                            Fats = 0,
                            Insulin = 0.0,
                            IsArchived = false,
                            Notes = "Starting to exercise, taking it easy",
                            Protein = 0,
                            StatusID = -10,
                            Time = new DateTime(2020, 11, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            UserID = "fca0f3e8-dae4-45d9-ad10-345257364235"
                        },
                        new
                        {
                            ID = -5,
                            BG = 5.5999999999999996,
                            Carbs = 0,
                            CategoryID = -3,
                            ExerciseLength = 0,
                            Fats = 0,
                            Insulin = 0.0,
                            IsArchived = false,
                            Notes = "Got a new job, pretty awesome",
                            Protein = 0,
                            StatusID = -6,
                            Time = new DateTime(2020, 11, 15, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            UserID = "fca0f3e8-dae4-45d9-ad10-345257364235"
                        },
                        new
                        {
                            ID = -6,
                            BG = 3.7000000000000002,
                            Carbs = 0,
                            CategoryID = -2,
                            ExerciseLength = 0,
                            Fats = 0,
                            Insulin = 0.0,
                            IsArchived = false,
                            Notes = "Felt strange, tested blood sugar, low reading",
                            Protein = 0,
                            StatusID = -2,
                            Time = new DateTime(2020, 11, 19, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            UserID = "fca0f3e8-dae4-45d9-ad10-345257364235"
                        },
                        new
                        {
                            ID = -7,
                            BG = 19.800000000000001,
                            Carbs = 0,
                            CategoryID = -1,
                            ExerciseLength = 0,
                            Fats = 0,
                            Insulin = 2.2000000000000002,
                            IsArchived = false,
                            Notes = "Felt very exhausted, tested blood sugar, high reading, took correction",
                            Protein = 0,
                            StatusID = -1,
                            Time = new DateTime(2020, 11, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            UserID = "fca0f3e8-dae4-45d9-ad10-345257364235"
                        },
                        new
                        {
                            ID = -8,
                            BG = 0.0,
                            Carbs = 80,
                            CategoryID = -5,
                            ExerciseLength = 0,
                            Fats = 28,
                            Insulin = 0.0,
                            IsArchived = false,
                            Notes = "Endluged in some fast food after excercising",
                            Protein = 33,
                            StatusID = -10,
                            Time = new DateTime(2020, 12, 4, 11, 51, 16, 190, DateTimeKind.Local).AddTicks(8813),
                            UserID = "77c8faaa-62f2-4993-96b2-48587cba72a3"
                        },
                        new
                        {
                            ID = -9,
                            BG = 0.0,
                            Carbs = 20,
                            CategoryID = -5,
                            ExerciseLength = 0,
                            Fats = 35,
                            Insulin = 0.0,
                            IsArchived = false,
                            Notes = "I'm stressed, running out of bacon. Gotta go shopping soon.",
                            Protein = 45,
                            StatusID = -2,
                            Time = new DateTime(2020, 12, 4, 11, 51, 16, 190, DateTimeKind.Local).AddTicks(8816),
                            UserID = "77c8faaa-62f2-4993-96b2-48587cba72a3"
                        },
                        new
                        {
                            ID = -10,
                            BG = 0.0,
                            Carbs = 0,
                            CategoryID = -4,
                            ExerciseLength = 60,
                            Fats = 0,
                            Insulin = 0.0,
                            IsArchived = false,
                            Notes = "Regular exercise, bench, legs, running",
                            Protein = 0,
                            StatusID = -7,
                            Time = new DateTime(2020, 11, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            UserID = "77c8faaa-62f2-4993-96b2-48587cba72a3"
                        },
                        new
                        {
                            ID = -11,
                            BG = 0.0,
                            Carbs = 0,
                            CategoryID = -3,
                            ExerciseLength = 0,
                            Fats = 0,
                            Insulin = 0.0,
                            IsArchived = false,
                            Notes = "Found awesome new exercise: https://www.verywellfit.com/the-plank-exercise-3120068",
                            Protein = 0,
                            StatusID = -6,
                            Time = new DateTime(2020, 11, 23, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            UserID = "77c8faaa-62f2-4993-96b2-48587cba72a3"
                        },
                        new
                        {
                            ID = -12,
                            BG = 0.0,
                            Carbs = 0,
                            CategoryID = -4,
                            ExerciseLength = 15,
                            Fats = 0,
                            Insulin = 0.0,
                            IsArchived = false,
                            Notes = "Tried the new plank exercise, pretty brutal",
                            Protein = 0,
                            StatusID = -1,
                            Time = new DateTime(2020, 11, 24, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            UserID = "77c8faaa-62f2-4993-96b2-48587cba72a3"
                        });
                });

            modelBuilder.Entity("WellnessTracker.Models.Status", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(10)");

                    b.Property<bool>("IsPositive")
                        .HasColumnType("bool");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(30)")
                        .HasAnnotation("MySql:CharSet", "utf8mb4")
                        .HasAnnotation("MySql:Collation", "utf8mb4_general_ci");

                    b.HasKey("ID");

                    b.ToTable("status");

                    b.HasData(
                        new
                        {
                            ID = -10,
                            IsPositive = true,
                            Name = "Normal"
                        },
                        new
                        {
                            ID = -9,
                            IsPositive = true,
                            Name = "Happy"
                        },
                        new
                        {
                            ID = -8,
                            IsPositive = true,
                            Name = "Relaxed"
                        },
                        new
                        {
                            ID = -7,
                            IsPositive = true,
                            Name = "Energetic"
                        },
                        new
                        {
                            ID = -6,
                            IsPositive = true,
                            Name = "Excited"
                        },
                        new
                        {
                            ID = -5,
                            IsPositive = false,
                            Name = "Sick"
                        },
                        new
                        {
                            ID = -4,
                            IsPositive = false,
                            Name = "Sad"
                        },
                        new
                        {
                            ID = -3,
                            IsPositive = false,
                            Name = "Stressed"
                        },
                        new
                        {
                            ID = -2,
                            IsPositive = false,
                            Name = "Anxious"
                        },
                        new
                        {
                            ID = -1,
                            IsPositive = false,
                            Name = "Tired"
                        });
                });

            modelBuilder.Entity("WellnessTracker.Models.User", b =>
                {
                    b.Property<string>("ID")
                        .HasColumnType("varchar(40)");

                    b.Property<bool>("IsDiabetic")
                        .HasColumnType("bool");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(64)")
                        .HasAnnotation("MySql:CharSet", "utf8mb4")
                        .HasAnnotation("MySql:Collation", "utf8mb4_general_ci");

                    b.Property<DateTime>("Registered")
                        .HasColumnType("datetime");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasAnnotation("MySql:CharSet", "utf8mb4")
                        .HasAnnotation("MySql:Collation", "utf8mb4_general_ci");

                    b.HasKey("ID");

                    b.ToTable("user");

                    b.HasData(
                        new
                        {
                            ID = "fca0f3e8-dae4-45d9-ad10-345257364235",
                            IsDiabetic = true,
                            Password = "6346c10aad3dd848f542060024022522ac86f9d7e13dbf39bb8a2252228c794e",
                            Registered = new DateTime(2020, 12, 4, 11, 51, 16, 180, DateTimeKind.Local).AddTicks(757),
                            Username = "Adolf"
                        },
                        new
                        {
                            ID = "77c8faaa-62f2-4993-96b2-48587cba72a3",
                            IsDiabetic = false,
                            Password = "a7b5c820d7a015504cb09776d23899e3f1e392e349916329a70ce3562d38565f",
                            Registered = new DateTime(2020, 12, 4, 11, 51, 16, 182, DateTimeKind.Local).AddTicks(1416),
                            Username = "Ummer"
                        });
                });

            modelBuilder.Entity("WellnessTracker.Models.Allergen_Entry", b =>
                {
                    b.HasOne("WellnessTracker.Models.Allergen", "Allergen")
                        .WithMany("AllergenEntries")
                        .HasForeignKey("AllergenID")
                        .HasConstraintName("FK_Allergen_Allergen_Entry")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WellnessTracker.Models.Entry", "Entry")
                        .WithMany("EntryAllergens")
                        .HasForeignKey("EntryID")
                        .HasConstraintName("FK_Entry_Allergen_Entry")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WellnessTracker.Models.Entry", b =>
                {
                    b.HasOne("WellnessTracker.Models.Category", "EntryCategory")
                        .WithMany("Entries")
                        .HasForeignKey("CategoryID")
                        .HasConstraintName("FK_Category_Entry")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WellnessTracker.Models.Status", "EntryStatus")
                        .WithMany("Entries")
                        .HasForeignKey("StatusID")
                        .HasConstraintName("FK_Status_Entry")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WellnessTracker.Models.User", "ApplicationUser")
                        .WithMany("Entries")
                        .HasForeignKey("UserID")
                        .HasConstraintName("FK_User_Entry")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
