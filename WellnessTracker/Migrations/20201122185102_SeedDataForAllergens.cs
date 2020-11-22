using Microsoft.EntityFrameworkCore.Migrations;

namespace WellnessTracker.Migrations
{
    public partial class SeedDataForAllergens : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "allergen",
                columns: new[] { "ID", "Name" },
                values: new object[,]
                {
                    { -1, "Egg" },
                    { -2, "Milk" },
                    { -3, "Tree Nuts" },
                    { -4, "Shellfish" },
                    { -5, "Soy" },
                    { -6, "Wheat" },
                    { -7, "Peanut" },
                    { -8, "Seeds" },
                    { -9, "Fish" },
                    { -10, "Gluten" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "allergen",
                keyColumn: "ID",
                keyValue: -10);

            migrationBuilder.DeleteData(
                table: "allergen",
                keyColumn: "ID",
                keyValue: -9);

            migrationBuilder.DeleteData(
                table: "allergen",
                keyColumn: "ID",
                keyValue: -8);

            migrationBuilder.DeleteData(
                table: "allergen",
                keyColumn: "ID",
                keyValue: -7);

            migrationBuilder.DeleteData(
                table: "allergen",
                keyColumn: "ID",
                keyValue: -6);

            migrationBuilder.DeleteData(
                table: "allergen",
                keyColumn: "ID",
                keyValue: -5);

            migrationBuilder.DeleteData(
                table: "allergen",
                keyColumn: "ID",
                keyValue: -4);

            migrationBuilder.DeleteData(
                table: "allergen",
                keyColumn: "ID",
                keyValue: -3);

            migrationBuilder.DeleteData(
                table: "allergen",
                keyColumn: "ID",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "allergen",
                keyColumn: "ID",
                keyValue: -1);
        }
    }
}
