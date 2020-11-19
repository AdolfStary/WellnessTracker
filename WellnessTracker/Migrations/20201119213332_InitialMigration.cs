using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WellnessTracker.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "allergen",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(30)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_allergen", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "category",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(30)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_category", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "status",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(30)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    IsPositive = table.Column<bool>(type: "bool", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_status", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    ID = table.Column<string>(type: "varchar(40)", nullable: false),
                    Username = table.Column<string>(type: "varchar(30)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    Password = table.Column<string>(type: "varchar(64)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    IsDiabetic = table.Column<bool>(type: "bool", nullable: false),
                    Registered = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "entry",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CategoryID = table.Column<int>(type: "int(10)", nullable: false),
                    UserID = table.Column<string>(type: "varchar(36)", nullable: false),
                    StatusID = table.Column<int>(type: "int(10)", nullable: false),
                    Time = table.Column<DateTime>(type: "datetime", nullable: false),
                    Carbs = table.Column<int>(type: "int(4)", nullable: false),
                    Protein = table.Column<int>(type: "int(4)", nullable: false),
                    Fats = table.Column<int>(type: "int(4)", nullable: false),
                    Notes = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    Insulin = table.Column<double>(type: "double(5, 1)", nullable: false),
                    BG = table.Column<double>(type: "double(5, 1)", nullable: false),
                    IsArchived = table.Column<bool>(type: "bool", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_entry", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Category_Entry",
                        column: x => x.CategoryID,
                        principalTable: "category",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Status_Entry",
                        column: x => x.StatusID,
                        principalTable: "status",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_Entry",
                        column: x => x.UserID,
                        principalTable: "user",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Allergen_Entry",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AllergenID = table.Column<int>(type: "int(10)", nullable: false),
                    EntryID = table.Column<int>(type: "int(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Allergen_Entry", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Allergen_Allergen_Entry",
                        column: x => x.AllergenID,
                        principalTable: "allergen",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Entry_Allergen_Entry",
                        column: x => x.EntryID,
                        principalTable: "entry",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "FK_Allergen_Allergen_Entry",
                table: "Allergen_Entry",
                column: "AllergenID");

            migrationBuilder.CreateIndex(
                name: "FK_Entry_Allergen_Entry",
                table: "Allergen_Entry",
                column: "EntryID");

            migrationBuilder.CreateIndex(
                name: "FK_Category_Entry",
                table: "entry",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "FK_Status_Entry",
                table: "entry",
                column: "StatusID");

            migrationBuilder.CreateIndex(
                name: "FK_User_Entry",
                table: "entry",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Allergen_Entry");

            migrationBuilder.DropTable(
                name: "allergen");

            migrationBuilder.DropTable(
                name: "entry");

            migrationBuilder.DropTable(
                name: "category");

            migrationBuilder.DropTable(
                name: "status");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
