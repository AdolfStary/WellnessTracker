using Microsoft.EntityFrameworkCore.Migrations;

namespace WellnessTracker.Migrations
{
    public partial class AddedSeedDataCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "category",
                columns: new[] { "ID", "IsDiabetic", "Name" },
                values: new object[,]
                {
                    { -5, false, "Meal" },
                    { -4, false, "Exercise" },
                    { -3, false, "Event" },
                    { -2, true, "BG Reading" },
                    { -1, true, "Insulin Injection" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "category",
                keyColumn: "ID",
                keyValue: -5);

            migrationBuilder.DeleteData(
                table: "category",
                keyColumn: "ID",
                keyValue: -4);

            migrationBuilder.DeleteData(
                table: "category",
                keyColumn: "ID",
                keyValue: -3);

            migrationBuilder.DeleteData(
                table: "category",
                keyColumn: "ID",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "category",
                keyColumn: "ID",
                keyValue: -1);
        }
    }
}
